import React from "react";
import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { Input, Avatar } from "react-native-elements";

// Sélectionner un véhicule et voir toutes ses informations
// Demander la reservation d'un véhicule 

import { GradientButton } from "../../../comps";

import { generalStyles, primaryColor2 } from "../../../Shared/css";

import StyledText from "../../../Shared/StyledText";

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

                                <View style={[generalStyles.center, generalStyles.smallcolorContainer]}>

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
                                            style={[generalStyles.colorContainer, generalStyles.globalShadow, { marginLeft: 10, marginRight: 10, marginBottom: 2, marginTop: 2 },
                                            selectedVehicule.vehiculeGUID === vehicule.vehiculeGUID && { backgroundColor: primaryColor2 }]}>

                                            <View style={generalStyles.spbetween}>

                                                <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>

                                                    <View style={generalStyles.spbetween}>
                                                        <StyledText>Véhicule</StyledText>
                                                        <StyledText>{vehicule.vehiculeBrand} - {vehicule.vehiculeModel}</StyledText>
                                                    </View>

                                                    <View style={generalStyles.spbetween}>
                                                        <StyledText>Type</StyledText>
                                                        <StyledText> {vehicule.vehiculeType}</StyledText>
                                                    </View>

                                                    <View style={generalStyles.spbetween}>
                                                        <StyledText>Immatriculation</StyledText>
                                                        <StyledText>{vehicule.vehiculeImmatriculation}</StyledText>
                                                    </View>
                                                    <View style={generalStyles.spbetween}>
                                                        <StyledText>Kilométrage</StyledText>
                                                        <StyledText>{vehicule.vehiculeKmTotalDone}</StyledText>
                                                    </View>

                                                    {vehicule.vehiculeIsUsed &&
                                                        <View style={generalStyles.center}>
                                                            <StyledText style={{ marginTop: 5, color: "crimson" }}>En cours d'utilisation</StyledText>
                                                        </View>
                                                    }

                                                </View>

                                                <View style={[generalStyles.center]}>

                                                    <Avatar size={65}
                                                        rounded
                                                        source={{ uri: vehicule.vehiculeSRC }}
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