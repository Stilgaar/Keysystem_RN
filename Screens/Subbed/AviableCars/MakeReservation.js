import React from "react";

import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { View, ScrollView } from "react-native";
import { generalStyles } from "../../../Shared/css";

import StyledText from "../../../Shared/StyledText";

import DateTimePicker from '@react-native-community/datetimepicker';
import { setSelectedDateReservation } from "../../../Reducer/GlobalReducer/globalDispatch";

import { GradientButton } from "../../../comps";

import format from "date-fns/format";

export default function MakeReservation({ route }) {

    // Got the concerned vehicule info trought the route props
    const { vehicule } = route.params

    ////////////////
    // States to get informations from inputs
    ////////////////

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    // States for dates
    const [mode, setMode] = React.useState('date');
    const [showStart, setShowStart] = React.useState(false);
    const [showEnd, setShowEnd] = React.useState(false);

    ////////////////
    // Change function to get the date informations
    ////////////////

    const onChangeStart = (_, selectedDate, type) => {
        const currentDate = selectedDate;
        setShowStart(false);
        globalDispatch(setSelectedDateReservation(currentDate, "startDate"))
    };

    const onChangeEnd = (_, selectedDate) => {
        const currentDate = selectedDate;
        setShowEnd(false);
        globalDispatch(setSelectedDateReservation(currentDate, "endDate"))
    };

    ////////////////
    // Change the mode of the DateTimePicker = Start and End (date or time)
    ////////////////

    const showModeStart = (currentMode) => {

        if (Platform.OS === 'android') {
            setShowStart(c => !c);
            // for iOS, add a button that closes the picker
            // ill need to see on IOS laterssss :3
        }
        setMode(currentMode);
    };

    const showModeEnd = (currentMode) => {

        if (Platform.OS === 'android') {
            setShowEnd(c => !c)
        }
        setMode(currentMode);
    };

    ////////////////
    // Shortcuts
    ////////////////

    const startDateFromGlobal = format(globalState.validationReservation[0].startDate, "dd-MM-yyyy - HH:mm:ss")
    const endDateFromGlobal = format(globalState.validationReservation[0].endDate, "dd-MM-yyyy - HH:mm:ss")

    return (

        <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

            <StyledText style={generalStyles.title}>Reservez</StyledText>

            <View style={[generalStyles.colorContainer]}>
                <StyledText>Voiture : {vehicule.vehiculeBrand} {vehicule.vehiculeModel}</StyledText>
                <StyledText>Immatriculation : {vehicule.vehiculeImmatriculation}</StyledText>
                <StyledText>Début reservation : {startDateFromGlobal}</StyledText>
                <StyledText>Fin reservation : {endDateFromGlobal} </StyledText>
            </View>

            <GradientButton
                handlePress={() => showModeStart('date')}
                addStyle={{ marginBottom: 5 }}
                text="Date début" />

            <GradientButton
                handlePress={() => showModeStart('time')}
                addStyle={{ marginBottom: 5 }}
                text="heure début" />

            <GradientButton
                handlePress={() => showModeEnd('date')}
                addStyle={{ marginBottom: 5 }}
                text="Date Fin" />

            <GradientButton
                handlePress={() => showModeEnd('time')}
                addStyle={{ marginBottom: 5 }}
                text="Heure Fin" />

            {/* THIS IS THE START */}

            {showStart && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={globalState.validationReservation[0].startDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeStart}
                />
            )}

            {/* THIS IS THE END */}

            {showEnd && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={globalState.validationReservation[0].endDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeEnd}
                />
            )}

            <View style={[generalStyles.colorContainer]}>

                {startDateFromGlobal === endDateFromGlobal ?

                    <StyledText style={[generalStyles.textCenter]}>Le début et la fin de la reservation sont les mêmes</StyledText>
                    :
                    <StyledText style={[generalStyles.textCenter]}>Vous pouvez procèder à la reservation</StyledText>
                }

            </View>

            <GradientButton
                disabled={startDateFromGlobal === endDateFromGlobal}
                text={`Demandez la reservation`}
                handlePress={() => console.log("SEND RESA", globalState.validationReservation)} />

        </ScrollView>
    )
}