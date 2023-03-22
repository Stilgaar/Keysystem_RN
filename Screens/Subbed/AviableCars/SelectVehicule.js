import React from "react";
import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { Input, Avatar } from "react-native-elements";

// Sélectionner un véhicule et voir toutes ses informations
// Demander la reservation d'un véhicule 

import { GradientButton } from "../../../comps";

import { generalStyles, primaryColor2 } from "../../../Shared/css";

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

    return (
        <>
            {globalState.user[0].isVerified ?
                <>
                    {vehiculeList ?

                        <View style={generalStyles.container}>

                            <ScrollView style={[generalStyles.container, { marginTop: 10, flexGrow: 1 }]}>

                                <Text style={generalStyles.title}>Véhicules disponibles</Text>

                                <View style={[generalStyles.center, generalStyles.whiteContainer]}>

                                    <Input placeholder={`Rechercher un véhicule`}
                                        onChangeText={(text) => setSearchVehicule(text)} />

                                </View>

                                {vehiculeList
                                    ?.filter(value => {
                                        return FilterEverything(value, searchVechicule)
                                    })
                                    .map((vehicule, i) => (

                                        <TouchableOpacity key={i}
                                            onPress={() => {
                                                if (selectedVehicule.vehiculeGUID === vehicule.vehiculeGUID) {
                                                    setSelectedVehicule({})
                                                }
                                                else { setSelectedVehicule(vehicule) }
                                            }}
                                            style={[generalStyles.whiteContainer, generalStyles.globalShadow, { marginLeft: 10, marginRight: 10, marginBottom: 2, marginTop: 2 },
                                            selectedVehicule.vehiculeGUID === vehicule.vehiculeGUID && { backgroundColor: primaryColor2 }]}>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                                <View>
                                                    <Text>Véhicule : {vehicule.vehiculeBrand} - {vehicule.vehiculeModel}</Text>
                                                    <Text>Type : {vehicule.vehiculeType}</Text>
                                                    <Text>Immatriculation : {vehicule.vehiculeImmatriculation}</Text>
                                                    <Text>Kilométrage : {vehicule.vehiculeKmTotalDone}</Text>

                                                    {vehicule.vehiculeIsUsed &&
                                                        <Text style={{ marginTop: 5 }}>En cours d'utilisation</Text>
                                                    }

                                                </View>

                                                <View style={[generalStyles.center]}>

                                                    <Avatar size={65}
                                                        rounded
                                                        source={{ uri: vehicule.vehiculeSRC }}
                                                        avatarStyle={generalStyles.globalShadow}
                                                    />

                                                </View>

                                            </View>

                                        </TouchableOpacity>
                                    ))}

                            </ScrollView>

                            {Object.keys(selectedVehicule).length > 0 &&

                                <View style={[generalStyles.mbgeneral65, { flexDirection: "row" }]}>

                                    <GradientButton text={`Voir disponibilités`}
                                        handlePress={() => navigation.navigate("VehiculeCalendar", { vehiculeGUID: selectedVehicule.vehiculeGUID })}
                                    />

                                    <GradientButton text={`Reservez`}
                                        handlePress={() => {
                                            globalDispatch(getSelectedVehiculeReseravation(selectedVehicule))
                                            navigation.navigate("MakeReservation", { vehicule: selectedVehicule })
                                        }} />

                                </View>
                            }

                        </View>

                        :

                        <>
                            <Text style={generalStyles.title}>Aucune voiture disponible</Text>
                        </>

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

export default SelectVehicle;