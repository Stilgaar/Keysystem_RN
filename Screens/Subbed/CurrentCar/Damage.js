import React from "react";

import { View, Text, ScrollView } from "react-native";

import StyledText from "../../../Shared/StyledText";

import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox, Input } from 'react-native-elements';

import { format } from 'date-fns';

import { GradientButton } from "../../../comps";

import DamageCheckBoxes from "./DamageCheckBoxes";
import { damageArray } from "../../../JSON/Fr/DamageArray";

import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { generalStyles } from "../../../Shared/css";

import { addInfoDispatch } from "../../../Reducer/GlobalReducer/globalDispatch";


// Sinistre(s) : 
// Localisation du/des dommage(s) sur le schéma du véhicule
// Photos

// DONE =>
// Date heure noms
// Fiche renseignements
// Commentaires

export default function Damage({ navigation, route }) {

    const { dispatchGeneralType } = route.params

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    ////////////////
    // States to get informations from inputs
    ////////////////

    // States for dates
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    // States for conductor
    const [isConductor, setIsConductor] = React.useState(true)

    ////////////////
    // Change function to get the date informations
    ////////////////

    const onChange = (_, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        globalDispatch(addInfoDispatch(currentDate, dispatchGeneralType, "generalDamageInfo", "currentDate"))
    };

    ////////////////
    // Change the mode of the DateTimePicker : (date or time)
    ////////////////

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(c => !c);
            // for iOS, add a button that closes the picker
            // ill need to see on IOS laterssss :3
        }
        setMode(currentMode);
    };

    ////////////////
    // JSX
    ////////////////

    return (

        <ScrollView style={[generalStyles.container]}>

            <Text style={generalStyles.title}>Ajouter un sinistre</Text>

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                <StyledText >
                    Vous avez subis un sinistre ?
                </StyledText>

                <StyledText>
                    Remplissez ce formulaire pour votre voiture pour que votre entreprise puisse prendre
                    les messures nessésaires le plus rapidement possible
                </StyledText>

            </View>


            <View style={[generalStyles.colorContainer, generalStyles.globalShadow, generalStyles.mbgeneral65]}>

                <StyledText style={{ textAlign: "center", marginBottom: 5 }}>
                    Date / Heure séléctionnée : {format(globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0].currentDate, "dd-MM-yyyy - HH:mm:ss")}
                </StyledText>

                <GradientButton handlePress={() => showMode('date')}
                    addStyle={{ marginBottom: 5 }}
                    text="Choisir Date" />

                <GradientButton handlePress={() => showMode('time')}
                    addStyle={{ marginBottom: 5 }}
                    text="Choisir heure" />

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0].currentDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}

                <CheckBox
                    title={`J'étais le conducteur`}
                    checked={isConductor}
                    onPress={() => setIsConductor(c => !c)}
                    containerStyle={{ marginBottom: 10 }}
                />

                {!isConductor &&

                    <Input placeholder="Conducteur"
                        value={globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0].fullName}
                        onChangeText={value => globalDispatch(addInfoDispatch(value, dispatchGeneralType, "generalDamageInfo", "fullName"))} />
                }

                <Input placeholder="Lieu de l'incident"
                    value={globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0].location}
                    onChangeText={value => globalDispatch(addInfoDispatch(value, dispatchGeneralType, "generalDamageInfo", "location"))} />


                <StyledText style={{ marginBottom: 10 }}>Localisation des dommages</StyledText>

                {damageArray.map((text, i) => (

                    <DamageCheckBoxes
                        key={text.key}
                        navigation={navigation}
                        text={text.text}
                        nav={text.key}
                        route={route}
                        globalState={globalState} />

                ))}

                <Input
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={value => globalDispatch(addInfoDispatch(value, dispatchGeneralType, "generalDamageInfo", "commentDamage"))}
                    value={globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0].commentDamage}
                    placeholder="Commentaire"
                    containerStyle={[generalStyles.textAeraContainer, { marginTop: 10 }]}
                    inputContainerStyle={generalStyles.textAeraContentContainer}
                />


                {/* ICI RAJOTUER DES IFS SUR LES CHAMPS PAR EXEMPLE OU QU'IL Y AIE AU MOINS UNE TOFF !! */}
                {globalState[`${dispatchGeneralType}`].length > 0 ?

                    <GradientButton text={`Envoyer Sinistre`}
                        handlePress={() => console.log("DAMAGE", globalState[`${dispatchGeneralType}`])} />

                    :

                    null
                }

            </View>

        </ScrollView >

    );
}
