import React from "react";
import { StateContext } from "../../../Context/StateContext";

import { View, ScrollView, TouchableOpacity } from "react-native";

import { generalStyles, greenblue } from "../../../Shared/css";

import StyledText from "../../../Shared/StyledText";

import Octicons from 'react-native-vector-icons/Octicons';

import { GradientButton } from "../../../comps";

// Clé numérique
// Information sur la clé active
// Date attribution
// Date fin
// Option dépassement ? + délai (en heures ou jours)

function NumericalKey({
    navigation
}) {

    const { globalState } = React.useContext(StateContext)

    return (

        <>
            {globalState.user[0].isVerified ?

                <>

                    {globalState.currentKeys.length > 0 ?

                        <ScrollView style={[generalStyles.container, generalStyles.mbgeneral65]}>

                            <View>
                                <StyledText style={[generalStyles.title, { marginBottom: 5 }]}>Clef(s) numériques</StyledText>
                            </View>

                            {globalState?.currentKeys.map((vehicule) => (

                                <TouchableOpacity
                                    key={vehicule.virtualKeyGUID}
                                    style={{ margin: 3 }}
                                    onPress={() => {
                                        navigation.navigate("SelectedVehicule", { virtualKeyGUID: vehicule.virtualKeyGUID, vehiculeGUID: vehicule.vehiculeGUID })
                                    }}>

                                    <View
                                        style={[generalStyles.globalShadow, {
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            backgroundColor: greenblue,
                                            padding: 10,
                                            borderTopEndRadius: 15,
                                            borderTopStartRadius: 15,
                                        }]}
                                    >

                                        <View style={{ flex: 0.3 }}>
                                            <Octicons name="key" size={30} color="black" />
                                        </View>

                                        <View style={{ flex: 2 }}>
                                            <StyledText style={{ textAlign: "center", fontSize: 30 }}>
                                                {vehicule.vehiculeBrand} {vehicule.vehiculeModel}
                                            </StyledText>
                                        </View>


                                        <View style={{ flex: 0.3 }}>
                                            <Octicons name="check-circle" size={30} color="black" />
                                        </View>
                                    </View>

                                    <View style={[{
                                        backgroundColor: "#efefef",
                                        padding: 10,
                                        borderBottomEndRadius: 15,
                                        borderBottomStartRadius: 15
                                    }]}>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <StyledText style={{ fontSize: 18 }}>Clef : {vehicule.virtualKeyGUID}</StyledText>

                                            <StyledText style={{ fontSize: 18 }}>{vehicule.vehiculeImmatriculation}</StyledText>
                                        </View>

                                    </View>

                                </TouchableOpacity >

                            ))}

                        </ScrollView >

                        :

                        <View style={[generalStyles.center, generalStyles.colorContainer, generalStyles.center, { flex: 1 }]}>

                            <StyledText style={{ textAlign: "center" }}>Vous ne disposez pas encore de clef(s) numériques, veuillez reserver une voiture</StyledText>

                            <GradientButton handlePress={() => navigation.navigate('Vehicules')}
                                addStyle={{ marginTop: 65 }}
                                StyledText={`Séléctionnez une voiture`} />

                        </View>

                    }

                </>

                :

                <View style={[generalStyles.center, generalStyles.colorContainer, generalStyles.center, { flex: 1 }]}>

                    <StyledText style={{ textAlign: "center" }}>Avant de pouvoir reverver une voiture vous devez activer votre compte. </StyledText>

                    <GradientButton handlePress={() => navigation.navigate('Account', { screen: "ActivateAccount" })}
                        addStyle={{ marginTop: 65 }}
                        StyledText={`Envoyer vos documents`} />

                </View>

            }

        </>

    );
}

export default NumericalKey;