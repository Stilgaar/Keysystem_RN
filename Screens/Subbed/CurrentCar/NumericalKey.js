import React from "react";
import { StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { generalStyles, greenblue, blackA } from "../../../Shared/css";

import { GradientButton } from "../../../comps";

import { TextInfo } from "../../../comps";
import { virtualKeysAllVehicules } from "../../../JSON/Fr/CurrentVehiculeArray";

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
                                <Text style={[generalStyles.title, { marginBottom: 5 }]}>Clef(s) numériques</Text>
                            </View>

                            {globalState?.currentKeys.map((vehicule) => (

                                <TouchableOpacity
                                    key={vehicule.virtualKeyGUID}
                                    style={[generalStyles.globalShadow, { margin: 3 }]}
                                    onPress={() => {
                                        navigation.navigate("SelectedVehicule", { virtualKeyGUID: vehicule.virtualKeyGUID, vehiculeGUID: vehicule.vehiculeGUID })
                                    }}>

                                    <View style={{ backgroundColor: greenblue, padding: 10, borderTopEndRadius: 15, borderTopStartRadius: 15 }}>

                                        <Text style={{ textAlign: "center" }}> {vehicule.vehiculeBrand} {vehicule.vehiculeModel}</Text>

                                    </View>

                                    <View style={[{ backgroundColor: "#efefef", padding: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }]}>

                                        <Text>{vehicule.virtualKeyGUID} </Text>

                                    </View>

                                </TouchableOpacity >

                            ))}

                        </ScrollView >

                        :

                        <View style={[generalStyles.center, generalStyles.whiteContainer, generalStyles.center, { flex: 1 }]}>

                            <Text style={{ textAlign: "center" }}>Vous ne disposez pas encore de clef(s) numériques, veuillez reserver une voiture</Text>

                            <GradientButton handlePress={() => navigation.navigate('Vehicules')}
                                addStyle={{ marginTop: 65 }}
                                text={`Séléctionnez une voiture`} />

                        </View>

                    }

                </>

                :

                <View style={[generalStyles.center, generalStyles.whiteContainer, generalStyles.center, { flex: 1 }]}>

                    <Text style={{ textAlign: "center" }}>Avant de pouvoir reverver une voiture vous devez activer votre compte. </Text>

                    <GradientButton handlePress={() => navigation.navigate('Account', { screen: "ActivateAccount" })}
                        addStyle={{ marginTop: 65 }}
                        text={`Envoyer vos documents`} />

                </View>

            }

        </>

    );
}

export default NumericalKey;