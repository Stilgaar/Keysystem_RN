import React from "react";

import { View, Text, ScrollView, Image } from "react-native";

import HistoryKM from "./HistoryKM";

import { generalStyles } from "../../../Shared/css";

import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { getSelectedVehicule } from "../../../Reducer/GlobalReducer/globalDispatch";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    GradientButton,
} from "../../../comps";

import VehiculesInfo from "./VehiculeInfos";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {

        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                console.log('THIS', state)
                setGlobalState(JSON.parse(state));
            },

            40)

    }, [globalState]);


    ////////////////
    // JSX
    ////////////////

    return (

        <View style={[generalStyles.container]}>
            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                {state?.currentCar ?
                    <>
                        {/* <Text style={[generalStyles.title, { marginBottom: 5 }]}>Véhicule Séléctionné</Text> */}

                        <VehiculesInfo style={[generalStyles.marginOverall]} vehicule={state.currentCar?.[0]} navigation={navigation} />

                        <HistoryKM style={[generalStyles.marginOverall]} data={state.currentCar?.[0]} />

                        <View style={[generalStyles.marginOverall, { flexDirection: "row", justifyContent: 'space-around' }]}>

                            <GradientButton text="action"
                                width={150}
                                buttonPadding={25}
                                addStyle={{ marginBottom: 30 }}
                                handlePress={() => navigation.navigate("Actions", { vehiculeGUID, virtualKeyGUID })}>

                                <FontAwesome5 name="play" size={25} color="black" />

                            </GradientButton>


                            <GradientButton text="Sinistre"
                                width={150}
                                buttonPadding={25}
                                addStyle={{ marginBottom: 30 }}
                                handlePress={() => navigation.navigate("Damage")}>

                                <FontAwesome5 name="car-crash" size={25} color="black" />

                            </GradientButton>



                        </View>

                        <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>

                            <GradientButton text="Check In"
                                addStyle={{ marginBottom: 30 }}
                                width={150}
                                buttonPadding={25}
                                handlePress={() => navigation.navigate("CheckIn")} >

                                <FontAwesome5 name="check-circle" size={25} color="black" />

                            </GradientButton>
                            {/* 
                        <GradientButton text="Check Out"
                           width={150}
                                buttonPadding={25}
                            addStyle={{ marginBottom: 5 }}
                            handlePress={() => navigation.navigate("CheckOut")} >
                            
                             <FontAwesome5 name="check-circle" size={25} color="black" />
                             </GradientButton>*/}

                            <GradientButton text="Coûts"
                                addStyle={{ marginBottom: 30 }}
                                width={150}
                                buttonPadding={25}
                                handlePress={() => navigation.navigate("Costs")}>

                                <FontAwesome5 name="euro-sign" size={25} color="black" />

                            </GradientButton>

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
