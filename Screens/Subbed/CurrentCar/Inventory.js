import React from "react";

import { View, Text, ScrollView } from "react-native";

import StyledText from "../../../Shared/StyledText";

import { generalStyles } from "../../../Shared/css";

import { GradientButton } from "../../../comps";

import { StateContext, DispatchContext } from "../../../Context/StateContext";
import { addInfoDispatch } from "../../../Reducer/GlobalReducer/globalDispatch";
import { Input } from 'react-native-elements';

import { inventoryArray } from "../../../JSON/Fr/InventoryArray"

import DamageCheckBoxes from "./DamageCheckBoxes";

import { checkOutInfoArray, checkInInfoArray } from "../../../JSON/Fr/InventoryArray";

//CHECK IN
// Localisation du/des dommage(s) grâce aux photos
// Commentaires

// CHECK OUT
// Clôturer mon emprunt
// Date et heure de fin => automatique au submit
// Commentaires
// Enregistrement position véhicule => hmmm ? 
// Etats des lieux => photos


export default function Inventory({ navigation, route }) {

    const { dispatchGeneralType } = route.params

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    const [lectureArray, setLectureArray] = React.useState()

    React.useEffect(() => {

        route.name === "CheckIn" ? setLectureArray(checkInInfoArray) : setLectureArray(checkOutInfoArray)

    }, [])

    return (

        <ScrollView style={[generalStyles.container]}>

            {lectureArray?.map(display => (
                <React.Fragment key={display.title}>
                    <Text style={generalStyles.title}>{display.title}</Text>

                    <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                        <StyledText style={generalStyles.titleInfo}>
                            {display.text1}
                        </StyledText>

                        <StyledText>
                            {display.text2}
                        </StyledText>

                    </View>
                </React.Fragment>
            ))}

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow, generalStyles.mbgeneral65]}>

                <Input
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={value => globalDispatch(addInfoDispatch(value, dispatchGeneralType, "generalInventoryInfo", "commentInventory"))}
                    value={globalState?.[`${dispatchGeneralType}`]?.[0]?.generalInventoryInfo?.[0].commentInventory}
                    placeholder="Commentaire"
                    containerStyle={[generalStyles.textAeraContainer, { marginTop: 10 }]}
                    inputContainerStyle={generalStyles.textAeraContentContainer}
                />

                <GradientButton width={250}
                    handlePress={() => navigation.navigate("inventoryGeneralFrontPanel", { routeType: route.name })}
                    text={`Commencer l'état des lieux`} />

                {globalState?.[`${dispatchGeneralType}`]
                    .some(obj => inventoryArray.map(item => item.key).includes(Object.keys(obj)[0])
                    ) &&

                    inventoryArray.map(text => (

                        <DamageCheckBoxes
                            key={text.key}
                            navigation={navigation}
                            text={text.text}
                            nav={text.key}
                            route={route}
                            globalState={globalState}
                        />
                    ))}

                {globalState[`${dispatchGeneralType}`].length > 10 ?

                    <GradientButton text={`Envoyer Etat des lieux`}
                        handlePress={() => {
                            console.log("INVENTORY TYPE :", route.name)
                            console.log("INVENTORY : ", globalState[`${dispatchGeneralType}`])
                        }} />

                    :

                    null
                }

            </View>

        </ScrollView>


    );
}
