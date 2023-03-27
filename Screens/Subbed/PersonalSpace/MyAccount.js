// React && React Native components
import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";

import { logoutDispatch } from "../../../Reducer/GlobalReducer/globalDispatch";
import useGlobalContext from "../../../Hooks/useGlobalContext";

import { generalStyles, greenblue, greyish } from "../../../Shared/css";

import { GradientButton } from "../../../comps";

import StyledText from "../../../Shared/StyledText";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Array to render texts with <TextInfo />
import TopBorderContainer from "../../../Shared/TopBorderContainer";
import BottomBorderContainer from "../../../Shared/BottomBorderContainer";

// Mon compte
// Infos

export default function MyAccount({ navigation }) {

    // Ca c'est ici pour le moment mais après tout le user sera fetch, de toutes manières, au moment du login et
    // sera passé dans le globalcontext/usereducer.

    const { userDispatch, userState } = useGlobalContext()

    const windowWidth = Dimensions.get('window').width;

    console.log(userState)

    return (

        <View style={[generalStyles.container]}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%' }}>

                <Text style={generalStyles.title}>Mon Compte</Text>

                <TopBorderContainer style={{ backgroundColor: greenblue, flexDirection: "row" }}>


                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start", }}>

                        {userState?.user?.[0]?.SRC ?

                            <Image source={{ uri: `${userState?.user?.[0]?.SRC}` }}
                                style={{ width: 70, height: 70, borderRadius: 50 }}
                            />
                            :
                            <MaterialIcons name={"person"} size={50} color={"black"} />

                        }

                    </View>

                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", }}>

                        <StyledText>{userState?.user?.[0]?.userAdress} </StyledText>
                        <StyledText>{userState?.user?.[0]?.userPostalCode} {userState?.user?.[0]?.userCity} {userState?.user?.[0]?.userCountry}</StyledText>
                        <StyledText>{userState?.user?.[0]?.userEmailAdress}</StyledText>
                    </View>

                </TopBorderContainer>

                <BottomBorderContainer style={{ backgroundColor: greyish }}>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <StyledText style={{ fontSize: 20, textAlign: "center" }}>

                            {userState?.user?.[0]?.fullName}


                        </StyledText>

                        <StyledText style={{ textAlign: "center" }}>

                            {userState?.user?.[0]?.birthdate}

                        </StyledText>
                    </View>

                </BottomBorderContainer>

                <View style={{ marginTop: 10 }}>

                    <Text style={generalStyles.title}>Modifier votre compte</Text>

                    <View style={[generalStyles.colorContainer, generalStyles.globalShadow, { backgroundColor: greyish }]}>

                        <View style={{ marginTop: 10 }}>

                            <GradientButton width={windowWidth - 50}
                                handlePress={() => navigation.navigate("ModifyAccount")}
                                text={`Modifiez vos informations`} />

                        </View>

                        <View style={{ marginTop: 10 }}>

                            <GradientButton width={windowWidth - 50}
                                handlePress={() => navigation.navigate("ActivateAccount")}
                                text={`Envoyez vos documents`} />

                        </View>

                    </View>

                    <View style={{ marginTop: 10 }}>

                        <View style={[generalStyles.colorContainer, generalStyles.globalShadow, { backgroundColor: greyish }]}>

                            <View style={{ marginTop: 10 }}>

                                <GradientButton width={windowWidth - 50}
                                    handlePress={() => navigation.navigate("History")}
                                    text={`Votre Historique`} />

                            </View>

                        </View>

                    </View>

                    <View style={{ marginTop: 10 }}>

                        <View style={[generalStyles.colorContainer, generalStyles.globalShadow, { backgroundColor: greyish }]}>

                            <View style={{ marginTop: 10 }}>

                                <GradientButton width={windowWidth - 50}
                                    handlePress={() => userDispatch(logoutDispatch())}
                                    text={`Déconnection`} />

                            </View>

                        </View>

                    </View>


                </View>

            </ScrollView>

        </View>

    );
}