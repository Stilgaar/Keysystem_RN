import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { GradientButton } from '../../../comps';

import StyledText from '../../../Shared/StyledText';

import useGlobalContext from '../../../Hooks/useGlobalContext';

import { generalStyles } from '../../../Shared/css';

import { delAllNotification, delNotification } from '../../../Reducer/GlobalReducer/globalDispatch';

export default function Notifs() {

    const { globalDispatch, globalState } = useGlobalContext()

    const id = React.useId()


    return (

        <View style={[generalStyles.container]}>

            <ScrollView style={[generalStyles.container, { marginTop: 10, flexGrow: 1 }]}>

                <Text style={generalStyles.title}>Notifications</Text>

                {globalState?.notificationsList.length > 0 ?

                    globalState?.notificationsList.map((notif, index) => (

                        <React.Fragment key={`${index}-${id}`}>
                            {(notif.title || notif.body) &&

                                <TouchableOpacity onPress={() => globalDispatch(delNotification(index))}
                                    style={[generalStyles.colorContainer, generalStyles.globalShadow, { marginLeft: 10, marginRight: 10, marginBottom: 2, marginTop: 2 }]}>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                        <View>

                                            <StyledText style={{ fontSize: 25 }}>{notif.title}</StyledText>

                                            <StyledText style={{ opacity: 0.7, marginLeft: 10, paddingTop: 5 }}>{notif.body}</StyledText>

                                        </View>

                                        <View>

                                            <StyledText>{notif.date}</StyledText>

                                            <GradientButton
                                                handlePress={() => globalDispatch(delNotification(index))}
                                                text={`vu`}
                                                width={50} />
                                        </View>

                                    </View>

                                </TouchableOpacity>

                            }

                        </React.Fragment>
                    ))

                    :

                    <View style={[generalStyles.colorContainer, { justifyContent: "center", alignItems: "center", flex: 1 }]} >
                        <StyledText style={{ textAlign: 'center', textAlignVertical: 'center' }}>Vous n'avez pas de notifications</StyledText>
                    </View>

                }


            </ScrollView>

            {globalState?.notificationsList.length > 1 &&

                <GradientButton handlePress={() => globalDispatch(delAllNotification())}
                    text={`Effacer tous`}
                    addStyle={{ marginBottom: 65, position: "fixed" }} />
            }

        </View>
    );
}



