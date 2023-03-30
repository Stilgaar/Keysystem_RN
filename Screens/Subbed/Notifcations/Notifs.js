import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { GradientButton } from '../../../comps';
import StyledText from '../../../Shared/StyledText';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import TopBorderContainer from '../../../Shared/TopBorderContainer';

import useGlobalContext from "../../../Hooks/useGlobalContext"

import { generalStyles, greenblue } from '../../../Shared/css';

import { delAllNotification, delNotification } from '../../../Reducer/GlobalReducer/globalDispatch';

export default function Notifs() {

    const id = React.useId()

    const { userState, userDispatch } = useGlobalContext()

    console.log("userState", userState)

    return (

        <View style={[generalStyles.container]}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%' }}>

                {userState?.notificationsList?.length > 0 ?

                    userState?.notificationsList?.map((notif, index) => (

                        <React.Fragment key={`${index}-${id}`}>

                            <View style={{ marginBottom: 5 }}>

                                <TopBorderContainer
                                    style={{ backgroundColor: greenblue, flexDirection: "row", justifyContent: "space-between", }}
                                >

                                    <StyledText style={{ fontSize: 25 }}>
                                        {notif.title}
                                    </StyledText>

                                    <GradientButton
                                        handlePress={() => userDispatch(delNotification(index))}
                                        text={`vu`}
                                        width={70}
                                        buttonPadding={4}
                                    />

                                </TopBorderContainer>


                                <BottomBorderContainer style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "white" }}>

                                    <StyledText style={{ opacity: 0.7, marginLeft: 10, paddingTop: 5 }}>

                                        {notif.body}

                                    </StyledText>

                                    <StyledText>

                                        {notif.date}

                                    </StyledText>

                                </BottomBorderContainer>
                            </View>

                        </React.Fragment>
                    ))

                    :

                    <View style={{ flex: 0.8, justifyContent: "center", alignContent: "center" }}>

                        <View style={[generalStyles.colorContainer,
                        {
                            borderWidth: 5,
                            borderColor: "black",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 0.5,
                            backgroundColor: 'white'
                        }]} >

                            <StyledText style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 20 }}>

                                Vous n'avez pas de notifications

                            </StyledText>

                        </View>

                    </View>

                }


            </ScrollView>

            {userState?.notificationsList?.length > 1 &&

                <GradientButton handlePress={() => userDispatch(delAllNotification())}
                    text={`Effacer tous`}
                    addStyle={{ marginBottom: 65 }} />
            }

        </View >
    );
}



