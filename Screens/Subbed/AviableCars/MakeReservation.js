import React from "react";

import { StateContext, DispatchContext } from "../../../Context/StateContext";

import { View, ScrollView } from "react-native";
import { generalStyles, greyish } from "../../../Shared/css";

import StyledText from "../../../Shared/StyledText";

import DateTimePicker from '@react-native-community/datetimepicker';
import { setSelectedDateReservation } from "../../../Reducer/GlobalReducer/globalDispatch";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GradientButton } from "../../../comps";

import { format, parseISO, isValid } from 'date-fns';
import VehiculesInfo from "../CurrentCar/VehiculeInfos";
import TopBorderContainer from "../../../Shared/TopBorderContainer";
import BottomBorderContainer from "../../../Shared/BottomBorderContainer";

export default function MakeReservation({ route }) {

    // Got the concerned vehicule info trought the route props
    const { vehicule } = route.params

    ////////////////
    // States to get informations from inputs
    ////////////////

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    const [startDateFromGlobal, setStartDateFromGlobal] = React.useState()
    const [endDateFromGlobal, setEndDateFromGlobal] = React.useState()

    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {

        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                setGlobalState(JSON.parse(state));
            },

            200)

    }, [globalState]);

    React.useEffect(() => {

        if (state) {

            const dateValue = state?.validationReservation?.[0]?.startDate;
            if (dateValue && !isNaN(new Date(dateValue).getTime())) {

                const dateObject = parseISO(dateValue);

                if (isValid(dateObject)) {

                    const formattedDate = format(dateObject, "yyyy-MM-dd, HH:mm");
                    setStartDateFromGlobal(formattedDate);
                }
            }

            const dateValue2 = state?.validationReservation?.[0]?.endDate;
            if (dateValue2 && !isNaN(new Date(dateValue2).getTime())) {

                const dateObject = parseISO(dateValue2);

                if (isValid(dateObject)) {

                    const formattedDate = format(dateObject, "yyyy-MM-dd, HH:mm");
                    setEndDateFromGlobal(formattedDate);
                }
            }
        }

    }, [state]);

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

    return (

        <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

            <StyledText style={generalStyles.title}>Reservez</StyledText>

            <VehiculesInfo vehicule={vehicule} type={'fromSelectCar'} />

            <TopBorderContainer style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "white", marginTop: 35 }}>

                <GradientButton
                    width={170}
                    buttonPadding={30}
                    handlePress={() => showModeStart('date')}
                    addStyle={{ marginBottom: 5 }}
                    text="date début" />

                <GradientButton
                    width={170}
                    buttonPadding={30}
                    handlePress={() => showModeStart('time')}
                    addStyle={{ marginBottom: 5 }}
                    text="heure début" />

            </TopBorderContainer>

            <BottomBorderContainer style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: greyish }}>

                <GradientButton
                    width={170}
                    buttonPadding={30}
                    handlePress={() => showModeEnd('date')}
                    addStyle={{ marginBottom: 5 }}
                    text="Date Fin" />

                <GradientButton
                    width={170}
                    buttonPadding={30}
                    handlePress={() => showModeEnd('time')}
                    addStyle={{ marginBottom: 5 }}
                    text="Heure Fin" />

            </BottomBorderContainer>



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

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow, { backgroundColor: "white", marginTop: 25 }]}>

                {startDateFromGlobal === endDateFromGlobal ?

                    <StyledText style={[generalStyles.textCenter]}>Le début et la fin de la reservation sont les mêmes</StyledText>
                    :
                    <>
                        <StyledText style={[generalStyles.textCenter]}>Vous pouvez procèder à la reservation</StyledText>
                        <StyledText style={[generalStyles.textCenter]}>Début de la reservation : {startDateFromGlobal} </StyledText>
                        <StyledText style={[generalStyles.textCenter]}>Fin de la reservation : {endDateFromGlobal} </StyledText>

                    </>
                }

            </View>

            <View style={[generalStyles.buttonContainer]}>
                <GradientButton
                    disabled={startDateFromGlobal === endDateFromGlobal}
                    text={`Demandez la reservation`}
                    handlePress={() => console.log("SEND RESA", globalState.validationReservation)} />

            </View>


        </ScrollView >
    )
}