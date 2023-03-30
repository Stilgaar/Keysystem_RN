import React from "react";
import { StateContext } from "../../../Context/StateContext";

import { View, ScrollView, Text } from "react-native";

import { generalStyles } from "../../../Shared/css";

import StyledText from "../../../Shared/StyledText";
import SingleKey from "./SingleKey";

import { GradientButton } from "../../../comps";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useGlobalContext from "../../../Hooks/useGlobalContext";

// Clé numérique
// Information sur la clé active
// Date attribution
// Date fin
// Option dépassement ? + délai (en heures ou jours)



function NumericalKey({
    navigation
}) {

    const { globalState } = React.useContext(StateContext)
    const { userState } = useGlobalContext()

    const [loading, setLoading] = React.useState(true);
    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                setGlobalState(JSON.parse(state));
                setLoading(false)
            },

            10)

    }, []);

    if (loading) {

        return (
            <View style={[generalStyles.center, { flex: 1 }]}>
                <Text>Loading</Text>
            </View>
        );
    }

    return (

        <>
            {userState?.user?.[0]?.isVerified ?

                <>

                    {state?.currentKeys?.length > 0 ?

                        <View style={[generalStyles.container]}>

                            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                                {state?.currentKeys.map((vehicule) => (

                                    <SingleKey vehicule={vehicule} navigation={navigation} key={vehicule.vehiculeGUID} />

                                ))}

                            </ScrollView >

                        </View>

                        :

                        <View style={[generalStyles.center, generalStyles.colorContainer, generalStyles.center, { flex: 1 }]}>

                            <StyledText style={{ textAlign: "center" }}>Vous ne disposez pas encore de clef(s) numériques, veuillez reserver une voiture</StyledText>

                            <GradientButton handlePress={() => navigation.navigate('Vehicules')}
                                addStyle={{ marginTop: 65 }}
                                text={`Séléctionnez une voiture`} />

                        </View>

                    }

                </>

                :

                <View style={[generalStyles.center, generalStyles.colorContainer, generalStyles.center, { flex: 1 }]}>

                    <StyledText style={{ textAlign: "center" }}>Avant de pouvoir reverver une voiture vous devez activer votre compte. </StyledText>

                    <GradientButton handlePress={() => navigation.navigate('Account', { screen: "ActivateAccount" })}
                        addStyle={{ marginTop: 65 }}
                        text={`Envoyer vos documents`} />

                </View>

            }

        </>

    );
}

export default NumericalKey;