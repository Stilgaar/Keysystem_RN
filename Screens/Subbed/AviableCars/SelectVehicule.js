import React from "react";
import { DispatchContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

import { Input } from "react-native-elements"

// Sélectionner un véhicule et voir toutes ses informations
// Demander la reservation d'un véhicule 

import VehiculeSelect from "./VehiculeSelect";

import { GradientButton } from "../../../comps";

import { generalStyles } from "../../../Shared/css";

import { FilterEverything } from "../../../Functions/FilterAll";
import { getSelectedVehiculeReseravation } from "../../../Reducer/GlobalReducer/globalDispatch";

// Faudra fetch ça plus tard
import vehiculeList from "../../../JSON/CAR_MOCK_DATA.json"
import useGlobalContext from "../../../Hooks/useGlobalContext";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import useFetch from "../../../Hooks/useFetch"

function SelectVehicle({ navigation }) {

    const [selectedVehicule, setSelectedVehicule] = React.useState({})
    const [searchVechicule, setSearchVehicule] = React.useState()
    const [searchModal, setSearchModal] = React.useState(false)

    const [filterType, setFilterType] = React.useState("all")

    const { globalDispatch } = React.useContext(DispatchContext)
    const { userState } = useGlobalContext()

    // const { data: vehiculeList } = useFetch(`${process.env.API_URL}resetapiroad`)

    return (

        <>
            {userState?.user?.[0]?.isVerified ?
                <>
                    {vehiculeList ?

                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={[generalStyles.container]}
                        >

                            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                                <View style={[generalStyles.center, { backgroundColor: "white" }]}>

                                    <View style={{ flexDirection: "row", paddingBottom: 5 }}>

                                        <GradientButton width={80}
                                            text={`Toutes`}
                                            buttonPadding={10}
                                            disabled={filterType === "all"}
                                            handlePress={() => setFilterType("all")} />

                                        <GradientButton
                                            width={80}
                                            buttonPadding={10}
                                            disabled={filterType === "used"}
                                            text={`Passée`} handlePress={() => setFilterType("used")} />

                                        <GradientButton width={80}
                                            buttonPadding={10}
                                            text={`Libre`}
                                            disabled={filterType === "free"}
                                            handlePress={() => setFilterType("free")} />

                                    </View>

                                    <View style={{ position: 'absolute', right: 7 }}>

                                        <TouchableOpacity onPress={() => setSearchModal(c => !c)}>

                                            <FontAwesome5 name="search" size={30} color="black" />

                                        </TouchableOpacity>

                                    </View>

                                </View>

                                <View style={[{ backgroundColor: "white", paddingTop: 5 }]}>

                                    {searchModal &&
                                        <Input placeholder={`Cherchez par modèle, type, plaque`}
                                            onChangeText={(text) => setSearchVehicule(text)} />
                                    }

                                </View>

                                {vehiculeList
                                    ?.filter(value => {
                                        return FilterEverything(value, searchVechicule)
                                    })?.filter(value => {
                                        if (filterType === "all") {
                                            return value
                                        } else if (filterType === "free") {
                                            return !value.vehiculeIsUsed
                                        } else if (filterType === "used") {
                                            return value.vehiculeUsed
                                        }
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
                                                style={{ marginLeft: 3, marginRight: 3, marginBottom: 2, marginTop: i === 0 ? 3 : 0 }}>


                                                <VehiculeSelect vehicule={vehicule} selectedVehicule={selectedVehicule} />


                                            </TouchableOpacity>

                                        </React.Fragment>
                                    ))}

                            </ScrollView>

                            {Object.keys(selectedVehicule).length > 0 &&

                                <View style={[, { flexDirection: "row", justifyContent: "space-around" }]}>

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