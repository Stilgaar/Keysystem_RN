import React from "react";
import { StateContext } from "../../../Context/StateContext";

import { View, ScrollView } from "react-native";

import { generalStyles } from "../../../Shared/css";

import StyledText from "../../../Shared/StyledText";
import SingleKey from "./SingleKey";

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

                        <View style={[generalStyles.container]}>

                            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                                <View>

                                    <StyledText style={[generalStyles.title, { marginBottom: 5 }]}>Clef(s) numériques</StyledText>

                                </View>

                                {globalState?.currentKeys.map((vehicule) => (

                                    <SingleKey vehicule={vehicule} navigation={navigation} key={vehicule.vehiculeGUID} />

                                ))}

                            </ScrollView >

                        </View>

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