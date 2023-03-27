import React from "react";

import { View, Text, ScrollView, Dimensions } from "react-native";

import { generalStyles } from "../../../Shared/css";
import { GradientButton } from "../../../comps";

// Voir mes précédents emprunts
// clés / périodes
// Etats des lieux
// trajets

export default function History({ navigation }) {

    const windowWidth = Dimensions.get('window').width

    // This name va filer l'array de dans userHistory qu'on va dispatcher dans les accordéons dans un stackScreen
    // la string pour le momment "userOldKeys sera remplace dans la navigation <APPNAVIGATOR /> et passé en prop
    // récupéré dans la route.params.


    return (

        <View style={[generalStyles.container]}>

            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                <Text style={generalStyles.title}>Historique</Text>

                <GradientButton handlePress={() => navigation.navigate("HistoryRoutes")}
                    width={windowWidth - 15}
                    buttonPadding={65}
                    addStyle={{ marginTop: 15, marginBottom: 15 }}
                    text={`Précédents Trajets`} />

                <GradientButton handlePress={() => navigation.navigate("HistoryKeys")}
                    width={windowWidth - 15}
                    buttonPadding={65}
                    addStyle={{ marginBottom: 15 }}
                    text={`Précédentes clefs`} />

                <GradientButton handlePress={() => navigation.navigate("HistoryNexReservation")}
                    width={windowWidth - 15}
                    buttonPadding={65}
                    addStyle={{ marginBottom: 15 }}
                    text={`Futures Locations`} />

            </ScrollView>

        </View>

    );
}
