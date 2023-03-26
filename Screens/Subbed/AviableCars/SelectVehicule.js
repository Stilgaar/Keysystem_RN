import React from "react";
import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

import { Input, Avatar } from "react-native-elements";

import AsyncStorage from '@react-native-async-storage/async-storage';

// Sélectionner un véhicule et voir toutes ses informations
// Demander la reservation d'un véhicule 

import VehiculesInfo from "../CurrentCar/VehiculeInfos";

import { GradientButton } from "../../../comps";

import { generalStyles, primaryColor2, greyish } from "../../../Shared/css";

import { FilterEverything } from "../../../Functions/FilterAll";
import { getSelectedVehiculeReseravation } from "../../../Reducer/GlobalReducer/globalDispatch";

// Faudra fetch ça plus tard
import vehiculeList from "../../../JSON/CAR_MOCK_DATA.json"

// import useFetch from "../../../Hooks/useFetch"

function SelectVehicle({ navigation }) {

    const [selectedVehicule, setSelectedVehicule] = React.useState({})
    const [searchVechicule, setSearchVehicule] = React.useState()

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    // const { data: vehiculeList } = useFetch(`${process.env.API_URL}resetapiroad`)

    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {

        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                setGlobalState(JSON.parse(state));
            },

            10)

    }, [globalState]);


    return (

        <>
            {state.user[0].isVerified ?
                <>
                    {vehiculeList ?

                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={[generalStyles.container]}
                        >

                            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                                <Text style={generalStyles.title}>Véhicules disponibles</Text>

                                <View style={[generalStyles.center, { backgroundColor: "white", padding: 4, margin: 5, borderRadius: 15 }]}>

                                    <Input placeholder={`Cherchez par modèle, type, plaque`}
                                        onChangeText={(text) => setSearchVehicule(text)} />

                                </View>

                                {vehiculeList
                                    ?.filter(value => {
                                        return FilterEverything(value, searchVechicule)
                                    })
                                    .map((vehicule, i) => (

                                        <React.Fragment key={i}>

                                            <TouchableOpacity key={i}
                                                onPress={() => {
                                                    if (selectedVehicule.vehiculeGUID === vehicule.vehiculeGUID) {
                                                        setSelectedVehicule({})
                                                    }
                                                    else { setSelectedVehicule(vehicule) }
                                                }}
                                                style={{ marginLeft: 10, marginRight: 10, marginBottom: 2, marginTop: 2 }}>

                                                <VehiculesInfo
                                                    vehicule={vehicule}
                                                    bgcolor={selectedVehicule.vehiculeGUID === vehicule.vehiculeGUID ? primaryColor2 : greyish}
                                                    type={`fromSelectCar`} />

                                            </TouchableOpacity>

                                        </React.Fragment>
                                    ))}

                            </ScrollView>

                            {Object.keys(selectedVehicule).length > 0 &&

                                <View style={[generalStyles.mbgeneral65, { flexDirection: "row", justifyContent: "space-around" }]}>

                                    <GradientButton text={`Disponibilités`}
                                        width={170}
                                        handlePress={() => navigation.navigate("VehiculeCalendar", { vehiculeGUID: selectedVehicule.vehiculeGUID })}
                                    />

                                    <GradientButton text={`Reservez`}
                                        width={170}
                                        handlePress={() => {
                                            globalDispatch(getSelectedVehiculeReseravation(selectedVehicule))
                                            navigation.navigate("MakeReservation", { vehicule: selectedVehicule })
                                        }} />

                                </View>
                            }

                        </KeyboardAvoidingView>

                        :

                        <>
                            <Text style={generalStyles.title}>Aucune voiture disponible</Text>
                        </>

                    }

                </>

                :

                <View style={[generalStyles.center, generalStyles.colorContainer, generalStyles.center, { flex: 1 }]}>

                    <Text style={{ textAlign: "center" }}>Avant de pouvoir reverver une voiture vous devez activer votre compte. </Text>

                    <GradientButton handlePress={() => navigation.navigate('Account', { screen: "ActivateAccount" })}
                        addStyle={{ marginTop: 65 }}
                        text={`Envoyer vos documents`} />

                </View>

            }


        </>
    );
}

export default SelectVehicle;