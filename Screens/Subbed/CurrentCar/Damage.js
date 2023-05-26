import {CheckBox, Input} from 'react-native-elements';
import {DispatchContext, StateContext} from '../../../Context/StateContext';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {format, isValid, parseISO} from 'date-fns';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import DamageCheckBoxes from './DamageCheckBoxes';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GradientButton} from '../../../comps';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {addInfoDispatch} from '../../../Reducer/GlobalReducer/globalDispatch';
import {damageArray} from '../../../JSON/Fr/DamageArray';
import {generalStyles} from '../../../Shared/css';

// Sinistre(s) :
// Localisation du/des dommage(s) sur le schéma du véhicule
// Photos

// DONE =>
// Date heure noms
// Fiche renseignements
// Commentaires

export default function Damage({navigation, route}) {
  const {dispatchGeneralType} = route.params;

  const {globalState} = React.useContext(StateContext);
  const {globalDispatch} = React.useContext(DispatchContext);

  const [state, setGlobalState] = React.useState(globalState);
  const [selectedDate, setSelectedDate] = React.useState();
  const [dateObject, setDateObjec] = React.useState();

  React.useEffect(() => {
    setTimeout(
      async () => {
        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
      },

      10,
    );
  }, [globalState]);

  React.useEffect(() => {
    if (state) {
      const dateValue =
        state?.attributionDamage?.[0]?.generalDamageInfo?.[0].currentDate;
      if (dateValue && !isNaN(new Date(dateValue).getTime())) {
        const dateObject = parseISO(dateValue);

        if (isValid(dateObject)) {
          const formattedDate = format(dateObject, 'yyyy-MM-dd, HH:mm');
          setDateObjec(dateObject);
          setSelectedDate(formattedDate);
        }
      }
    }
  }, [state]);

  ////////////////
  // States to get informations from inputs
  ////////////////

  // States for dates
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  // States for conductor
  const [isConductor, setIsConductor] = React.useState(true);

  ////////////////
  // Change function to get the date informations
  ////////////////

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    globalDispatch(
      addInfoDispatch(
        currentDate,
        dispatchGeneralType,
        'generalDamageInfo',
        'currentDate',
      ),
    );
  };

  ////////////////
  // Change the mode of the DateTimePicker : (date or time)
  ////////////////

  const showMode = currentMode => {
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
    <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
        <TopBorderContainer>
          <StyledText>Vous avez subi un sinistre ?</StyledText>
        </TopBorderContainer>
        <BottomBorderContainer>
          <StyledText style={{textAlign: 'justify'}}>
            Remplissez ce formulaire pour votre voiture pour que votre
            entreprise puisse prendre les messures nécessaire le plus rapidement
            possible
          </StyledText>
        </BottomBorderContainer>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
        <TopBorderContainer>
          <StyledText style={{textAlign: 'center', marginBottom: 5}}>
            Date / Heure sélectionnée : {selectedDate}
          </StyledText>
        </TopBorderContainer>

        <BottomBorderContainer>
          <GradientButton
            handlePress={() => showMode('date')}
            addStyle={{marginBottom: 5}}
            text="Choisir Date"
          />

          <GradientButton
            handlePress={() => showMode('time')}
            addStyle={{marginBottom: 5}}
            text="Choisir heure"
          />

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateObject}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <CheckBox
            title={`J'étais le conducteur`}
            checked={isConductor}
            onPress={() => setIsConductor(c => !c)}
            containerStyle={{marginBottom: 10}}
          />

          {!isConductor && (
            <Input
              placeholder="Conducteur"
              value={
                globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0]
                  .fullName
              }
              onChangeText={value =>
                globalDispatch(
                  addInfoDispatch(
                    value,
                    dispatchGeneralType,
                    'generalDamageInfo',
                    'fullName',
                  ),
                )
              }
            />
          )}

          <Input
            placeholder="Lieu de l'incident"
            value={
              globalState?.attributionDamage?.[0]?.generalDamageInfo?.[0]
                .location
            }
            onChangeText={value =>
              globalDispatch(
                addInfoDispatch(
                  value,
                  dispatchGeneralType,
                  'generalDamageInfo',
                  'location',
                ),
              )
            }
          />

          <StyledText style={{marginBottom: 10}}>
            {' '}
            Localisation des dommages{' '}
          </StyledText>

          {damageArray.map((text, i) => (
            <DamageCheckBoxes
              index={i}
              key={text.key}
              navigation={navigation}
              text={text.text}
              nav={text.key}
              route={route}
              globalState={state}
            />
          ))}

          <Input
            style={{textAlignVertical: 'top'}}
            multiline={true}
            numberOfLines={5}
            onChangeText={value =>
              globalDispatch(
                addInfoDispatch(
                  value,
                  dispatchGeneralType,
                  'generalDamageInfo',
                  'commentDamage',
                ),
              )
            }
            value={
              state?.attributionDamage?.[0]?.generalDamageInfo?.[0]
                .commentDamage
            }
            placeholder="Commentaire"
            containerStyle={[generalStyles.textAeraContainer, {marginTop: 10}]}
            inputContainerStyle={generalStyles.textAeraContentContainer}
          />

          {/* ICI RAJOTUER DES IFS SUR LES CHAMPS PAR EXEMPLE OU QU'IL Y AIE AU MOINS UNE TOFF !! */}
          {state[`${dispatchGeneralType}`].length > 0 ? (
            <GradientButton
              text={`Envoyer Sinistre`}
              handlePress={() =>
                console.log('DAMAGE', state[`${dispatchGeneralType}`])
              }
            />
          ) : null}
        </BottomBorderContainer>
      </TouchableOpacity>
    </ScrollView>
  );
}
