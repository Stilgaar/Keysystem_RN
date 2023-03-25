import React from "react";

import { View, Text, ScrollView, Image } from "react-native";

import HistoryKM from "./HistoryKM";

import { generalStyles } from "../../../Shared/css";

import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { getSelectedVehicule } from "../../../Reducer/GlobalReducer/globalDispatch";

import {
    GradientButton,
} from "../../../comps";

import VehiculesInfo from "./VehiculeInfos";

import StyledText from "../../../Shared/StyledText";

import vehicules from "../../../JSON/CAR_MOCK_DATA.json"

// Fiche(s) véhicule(s) séléctionné
// Marque + modèle
// Numéro plaque d’immatriculation (API SIV ?)
// le kilométrage actuel
// Type de contrat (location, en propre, etc.) + nom loueur + date de restitution
// Date prochaine maintenance

export default function SelectedVehicule({ navigation, route }) {

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    // I DONT KNOW YET IF WE'LL MAKE A GET WITH THE VEHICULE OR THE VIRTUAL KEY
    const { vehiculeGUID, virtualKeyGUID } = route.params

    React.useEffect(() => {

        const selectedVehicule = vehicules.filter(vechiule => vechiule.vehiculeGUID === vehiculeGUID)

        globalDispatch(getSelectedVehicule(selectedVehicule))

    }, [])

    // 

    ////////////////
    // JSX
    ////////////////

    return (

        <View style={[generalStyles.container]}>
            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                {globalState?.currentCar ?
                    <>
                        {/* <Text style={[generalStyles.title, { marginBottom: 5 }]}>Véhicule Séléctionné</Text> */}

                        <VehiculesInfo style={[generalStyles.marginOverall]} globalState={globalState} navigation={navigation} />

                        <HistoryKM style={[generalStyles.marginOverall]} data={globalState.currentCar?.[0]} />

                        <View style={[generalStyles.marginOverall, { flexDirection: "row", justifyContent: 'space-around' }]}>

                            <GradientButton text="action"
                                width={170}
                                buttonPadding={40}
                                addStyle={{ marginBottom: 5 }}
                                handlePress={() => navigation.navigate("Actions", { vehiculeGUID, virtualKeyGUID })} />


                            <GradientButton text="Sinistre"
                                width={170}
                                buttonPadding={40}
                                addStyle={{ marginBottom: 5 }}
                                handlePress={() => navigation.navigate("Damage")} />

                        </View>

                        <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>

                            <GradientButton text="Check In"
                                addStyle={{ marginBottom: 5 }}
                                width={170}
                                buttonPadding={40}
                                handlePress={() => navigation.navigate("CheckIn")} />
                            {/* 
                        <GradientButton text="Check Out"
                           width={170}
                            buttonPadding={40}
                            addStyle={{ marginBottom: 5 }}
                            handlePress={() => navigation.navigate("CheckOut")} /> */}

                            <GradientButton text="Coûts"
                                addStyle={{ marginBottom: 5 }}
                                width={170}
                                buttonPadding={40}
                                handlePress={() => navigation.navigate("Costs")} />
                        </View>

                    </>
                    :
                    <>
                        <Text style={generalStyles.title}>Vous n'avez pas de clefs numérique ou de clefs assignés</Text>

                        <GradientButton text="Choisir une voiture"
                            addStyle={{ marginBottom: 5 }}
                            handlePress={() => navigation.navigate("Vehicules")} />

                    </>

                }

            </ScrollView>
        </View>
    );
}
