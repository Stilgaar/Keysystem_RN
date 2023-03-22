import React from "react";

import { View, Text, ScrollView } from "react-native";

import HistoryKM from "./HistoryKM";
import VehiculesInfo from "./VehiculeInfos";

import { generalStyles } from "../../../Shared/css";

import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { getSelectedVehicule } from "../../../Reducer/GlobalReducer/globalDispatch";

import {
    GradientButton,
} from "../../../comps";

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

    ////////////////
    // JSX
    ////////////////

    return (

        <ScrollView style={[generalStyles.container, generalStyles.mbgeneral65, { flexGrow: 1 }]}>

            {globalState?.currentCar ?
                <>
                    {/* <Text style={[generalStyles.title, { marginBottom: 5 }]}>Véhicule Séléctionné</Text> */}

                    <View style={[generalStyles.colorContainer, generalStyles.globalShadow, { marginTop: 10 }]}>

                        <VehiculesInfo data={globalState.currentCar?.[0]} />

                    </View>

                    <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                        <HistoryKM data={globalState.currentCar?.[0]} />

                    </View>

                    <GradientButton text="action"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("Actions", { vehiculeGUID, virtualKeyGUID })} />

                    <GradientButton text="Sinistre"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("Damage")} />

                    <GradientButton text="Check In"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("CheckIn")} />

                    <GradientButton text="Check Out"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("CheckOut")} />

                    <GradientButton text="Pochette Virtuelle"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("VirtualPouch")} />

                    <GradientButton text="Coûts"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("Costs")} />

                    <GradientButton text="Where is my car"
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("CarMap")} />

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

    );
}
