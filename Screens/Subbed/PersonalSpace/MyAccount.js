// React && React Native components
import React, { useContext } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { StateContext } from "../../../Context/StateContext";

import { generalStyles } from "../../../Shared/css";

import { TextInfo, GradientButton } from "../../../comps";

// Array to render texts with <TextInfo />
import { accountArrayInfoText } from "../../../JSON/Fr/MyAccountArray"

// Mon compte
// Infos

export default function MyAccount({ navigation }) {

    // Ca c'est ici pour le moment mais après tout le user sera fetch, de toutes manières, au moment du login et
    // sera passé dans le globalcontext/usereducer.

    const { globalState } = useContext(StateContext)

    const windowWidth = Dimensions.get('window').width;

    return (

        <View style={[generalStyles.container]}>

            <ScrollView style={[generalStyles.container, { marginTop: 10, marginBottom: 65, flexGrow: 1 }]}>

                <Text style={generalStyles.title}>Mon Compte</Text>

                <View style={[generalStyles.whiteContainer, generalStyles.globalShadow]}>

                    <TextInfo array={accountArrayInfoText} data={globalState.user[0]} />

                </View>

                <View style={{ marginTop: 10 }}>

                    <Text style={generalStyles.title}>Modifier votre compte</Text>

                    <View style={[generalStyles.whiteContainer, generalStyles.globalShadow]}>

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

                        <Text style={generalStyles.title}>Historique</Text>

                        <View style={[generalStyles.whiteContainer, generalStyles.globalShadow]}>

                            <View style={{ marginTop: 10 }}>

                                <GradientButton width={windowWidth - 50}
                                    handlePress={() => navigation.navigate("History")}
                                    text={`Vers historiques`} />

                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView>

        </View>

    );
}