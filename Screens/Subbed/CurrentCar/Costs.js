import React from "react";
import { DispatchContext, StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView } from "react-native";

import StyledText from "../../../Shared/StyledText";

import { Input } from "react-native-elements";

import { generalStyles } from "../../../Shared/css";

import { costSelectType, costPriceAdd } from "../../../Reducer/GlobalReducer/globalDispatch";

import DropDownPicker from 'react-native-dropdown-picker';
import { GradientButton } from "../../../comps";

import PicsFromB64 from "../../../Shared/PicsFromB64";

// Saisie des dépenses
// entretien, 
// pneumatique, 
// franchise accident,
// réparations,
// essence, 
// peage... + divers (carrosserie…)

// Cotisation assurance => ça rime à rien

export default function Costs({ navigation, route }) {

    const { dispatchGeneralType } = route.params

    ////////////////
    // To open close the dropdown menu
    ////////////////

    const [dropDownOpen, setDropDownOpen] = React.useState(false)

    ////////////////
    // Language Picker (not bad !)
    ////////////////

    DropDownPicker.setLanguage("FR");
    DropDownPicker.setMode("BADGE");

    ////////////////
    // Value of the items
    ////////////////

    const [items, setItems] = React.useState([
        { label: 'Entretien', value: 'costMaintenance' },
        { label: 'Pneumatique', value: 'costTires' },
        { label: 'Franchise accident', value: 'costDamage' },
        { label: 'Réparations', value: 'costReparation' },
        { label: 'Essence', value: 'costGas' },
        { label: 'Peage', value: 'costToll' },
        { label: 'Autre', value: 'costOther' },
    ]);

    const { globalDispatch } = React.useContext(DispatchContext)
    const { globalState } = React.useContext(StateContext)

    return (


        <View style={[generalStyles.container]}>
            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                    <StyledText>
                        Gestion des côuts du véhicule
                    </StyledText>

                    <StyledText>
                        Rajoutez les coûts de votre voiture
                    </StyledText>

                </View>

                <View style={[generalStyles.colorContainer, generalStyles.globalShadow,]}>

                    <View style={{ zIndex: 50 }}>
                        <DropDownPicker
                            //  multiple={true}
                            open={dropDownOpen}
                            value={globalState?.[`${dispatchGeneralType}`]?.[0]?.costType}
                            zIndex={5000}
                            zIndexInverse={1000}
                            elevation={5000} // Add elevation for Android
                            setOpen={setDropDownOpen}
                            items={items}
                            onSelectItem={(item) => globalDispatch(costSelectType(item))}
                            setItems={setItems}
                            // BORDEL
                            listMode="SCROLLVIEW"
                            scrollViewProps={{
                                nestedScrollEnabled: true,
                            }}
                        />
                    </View>

                    <>
                        {globalState?.[`${dispatchGeneralType}`]?.[0]?.costType ?

                            items
                                .filter(item => item.value === globalState?.[`${dispatchGeneralType}`]?.[0]?.costType)
                                .map(filteredValue => (

                                    <View key={filteredValue.label} style={[generalStyles.globalShadow, { marginTop: 15 }]}>

                                        <Input
                                            keyboardType="numeric"
                                            value={globalState?.[`${dispatchGeneralType}`]?.[0]?.costTotalHT}
                                            label={`Montant HT :  ${filteredValue.label}`}
                                            placeholder={`Prix ${filteredValue.label} HT`}
                                            onChangeText={value => globalDispatch(costPriceAdd(value, "costTotalHT"))}
                                        />

                                        <Input
                                            keyboardType="numeric"
                                            value={globalState?.[`${dispatchGeneralType}`]?.[0]?.costTotalTTC}
                                            label={`Montant TTC :  ${filteredValue.label}`}
                                            placeholder={`Prix ${filteredValue.label} HT`}
                                            onChangeText={value => globalDispatch(costPriceAdd(value, "costTotalTTC"))}
                                        />

                                        <Input
                                            keyboardType="numeric"
                                            value={globalState?.[`${dispatchGeneralType}`]?.[0]?.costTotalTVA}
                                            label={`TVA : ${filteredValue.label}`}
                                            placeholder={`Prix ${filteredValue.label} TVA`}
                                            onChangeText={value => globalDispatch(costPriceAdd(value, "costTotalTVA"))}
                                        />

                                    </View>

                                ))


                            :

                            <>

                                <View style={[generalStyles.globalShadow, { marginTop: 15 }]}>
                                    {Array(3).fill().map((_, index) => (
                                        <Input
                                            key={index}
                                            label={`Choisissez un type de cout`}
                                            placeholder={`Choisissez un type de cout`}
                                        />
                                    ))}

                                </View>
                            </>

                        }

                    </>

                    <GradientButton
                        text={`Ajouter Document`}
                        addStyle={{ marginBottom: 5 }}
                        handlePress={() => navigation.navigate("attributionCost")}
                    />

                    <PicsFromB64
                        picsArray={globalState?.[`${dispatchGeneralType}`]?.[1]?.["attributionCostDoc"]}
                        dispatchGeneralType={dispatchGeneralType}
                        dispatchType={"attributionCostDoc"}
                    />

                    <GradientButton
                        disabled={
                            (globalState[`${dispatchGeneralType}`][0].costTotalHT &&
                                globalState[`${dispatchGeneralType}`][0].costTotalTTC &&
                                globalState[`${dispatchGeneralType}`][0].costTotalTVA &&
                                globalState?.[`${dispatchGeneralType}`]?.[1]?.["attributionCostDoc"].length > 0
                            ) ? false : true}
                        text={`Envoyer Coût`}
                        handlePress={() => console.log(globalState?.[`${dispatchGeneralType}`])}
                    />

                </View>

            </ScrollView>

        </View>


    );
}