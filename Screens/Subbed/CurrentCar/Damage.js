import React, { useState } from 'react';
import { CheckBox, Input } from 'react-native-elements';
import { DispatchContext, StateContext } from '../../../Context/StateContext';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { format, isValid, parseISO } from 'date-fns';
import PicsFromB64 from '../../../Shared/PicsFromB64';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import DamageCheckBoxes from './DamageCheckBoxes';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GradientButton } from '../../../comps';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import { addInfoDispatch } from '../../../Reducer/GlobalReducer/globalDispatch';
import { damageArray } from '../../../JSON/Fr/DamageArray';
import { generalStyles } from '../../../Shared/css';
import moment from 'moment';
import { API_URL } from "@env"

// Sinistre(s) :
// Localisation du/des dommage(s) sur le schéma du véhicule
// Photos

// TODO: REFAIRE PROPRE AVEC DISPTACHER ET TOUT LE TRALALA / REFRESH APRES ADD

// DONE =>
// Date heure noms
// Fiche renseignements
// Commentaires

export default function Damage({ navigation, route }) {
  // const {dispatchGeneralType} = route.params;

  // const {globalDispatch} = React.useContext(DispatchContext);
  const { globalState } = React.useContext(StateContext);

  const [damageDate, setDamageDate] = useState(new Date());
  const [showDamageDatePicker, setShowDamageDatePicker] = useState(false);
  const [showDamageTimePicker, setShowDamageTimePicker] = useState(false);

  const { userState } = useGlobalContext();

  // const [selectedDate, setSelectedDate] = React.useState();
  // const [dateObject, setDateObjec] = React.useState();
  const [driverName, setDriverName] = useState(userState?.user?.userFullName);
  const [location, setLocation] = useState('');


  // React.useEffect(() => {
  //   if (state) {
  //     const dateValue =
  //       state?.attributionDamage?.[0].damageDate;
  //       console.log(state?.attributionDamage?.[0])
  //     if (dateValue && !isNaN(new Date(dateValue).getTime())) {
  //       const dateObject = parseISO(dateValue);

  //       if (isValid(dateObject)) {
  //         const formattedDate = format(dateObject, 'yyyy-MM-dd, HH:mm');
  //         setDateObjec(dateObject);
  //         setSelectedDate(formattedDate);
  //       }
  //     }
  //   }
  // }, [state]);

  ////////////////
  // States to get informations from inputs
  ////////////////

  // States for dates
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  // States for conductor
  const [isDriver, setIsDriver] = React.useState(true);

  ////////////////
  // Change function to get the date informations
  ////////////////

  // const onChange = (_, selectedDate) => {
  //   const damageDate = selectedDate;
  //   setShow(false);
  //   globalDispatch(
  //     addInfoDispatch(
  //       damageDate,
  //       dispatchGeneralType,
  //       'damageDate',
  //     ),
  //   );
  // };

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


  const handleDamageDateChange = (event, selectedDate) => {
    setShowDamageDatePicker(false);
    if (selectedDate) {
      setDamageDate(selectedDate);
    }
  };

  const handleDamageTimeChange = (event, selectedTime) => {
    setShowDamageTimePicker(false);
    console.log("DAMAGE.js", selectedTime.toJSON())
    if (selectedTime) {
      const updatedDate = new Date(damageDate);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setDamageDate(updatedDate);
    }
  };

  const handleSendDamage = async () => {
    /*
    Ce qu'il faudra qu'il y ai dans le globalState
    attributionDamage: [{
            vehicleGuid : "",
            userGuid : "",
            damageDate: new Date(),
            ToInsurance: false,
            repairs: null,
            damageRepairsDateDone: null,
            isDriver: true,
            driverName: "",
            attributionDocs: []
    }],
    */
    try {
      const formData = new FormData()
      formData.append(`vehicleGuid`, globalState?.currentCar?.vehicleGuid)
      formData.append(`userGuid`, userState?.user?.userGuid)
      formData.append(`DamageDate`, damageDate.toJSON())
      // SET TO False/empty pour le moment, on verra si on permet le changement ultérieurement
      formData.append(`ToInsurance`, false)
      formData.append(`Repairs`, '')
      formData.append(`DamageRepairsDateDone`, '')
      formData.append(`IsDriver`, isDriver)
      formData.append(`DriverName`, driverName)
      formData.append(`Location`, location)

      const attributionDocs = []
      if ((globalState.photoDamage !== undefined || state.photoDamage !== null)) {
        globalState.photoDamage.forEach(photo => {
          const attributionElement =
          {
            documentFormFile: { uri: photo.documentFormFile.uri, type: 'image/jpeg', name: photo.documentFormFile.name },
            displayName: `Photo sinistre`,
          }
          attributionDocs.push(attributionElement)
        });

        if (attributionDocs.length > 0) {
          attributionDocs.forEach((doc, index) => {
            // Append the file
            const file = doc.documentFormFile;
            formData.append(`attributionDocs[${index}].DocumentFormFile`, file);
            // Append the display name
            const displayName = doc.displayName || 'DefaultName';
            formData.append(`attributionDocs[${index}].DisplayName`, displayName);
          })
        }
      }
      else throw new Error('You should at least send one document')

      console.log("FORM DATA DAMAGE ====> ", formData)

      let postDamageResult = await fetch(`${API_URL}/api/Damage`, {
        method: 'POST',
        body: formData
      }).catch((error) => setErrorLog(error.errorMessage));

      if (postDamageResult.ok) {
        globalState.photoDamage = []
      }
    } catch (e) {
      // Handle any errors that occurred during the fetch request
      console.error(e);
      // Set an error log if needed
      setErrorLog(e.errorMessage);
    }
  }

  ////////////////
  // JSX
  ////////////////

  return (
    <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

      <TouchableOpacity
        activeOpacity={1}
        style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>
        <TopBorderContainer>

          <StyledText>Vous avez subi un sinistre ?</StyledText>

        </TopBorderContainer>

        <BottomBorderContainer>

          <StyledText style={{ textAlign: 'justify' }}>
            Remplissez ce formulaire pour votre voiture pour que votre
            entreprise puisse prendre les messures nécessaire le plus rapidement
            possible
          </StyledText>

        </BottomBorderContainer>

      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>

        <TopBorderContainer>

          <StyledText style={{ textAlign: 'center', marginBottom: 5 }}>
            Date / Heure sélectionnée : {moment(damageDate.toJSON()).format('DD/MM/YYYY - HH:mm')}
          </StyledText>

        </TopBorderContainer>

        <BottomBorderContainer>

          <GradientButton
            // handlePress={() => showMode('date')}
            addStyle={{ marginBottom: 5 }}
            text="Choisir Date"
            handlePress={() => setShowDamageDatePicker(true)}
          />

          <GradientButton
            // handlePress={() => showMode('time')}
            addStyle={{ marginBottom: 5 }}
            text="Choisir heure"
            handlePress={() => setShowDamageTimePicker(true)}
          />

          {showDamageDatePicker && (
            <DateTimePicker
              value={damageDate}
              mode="date"
              onChange={handleDamageDateChange}
            />
          )}

          {showDamageTimePicker && (
            <DateTimePicker
              value={damageDate}
              mode="time"
              onChange={handleDamageTimeChange}
            />
          )}
          {/* 
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateObject}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )} */}

          <CheckBox
            title={`J'étais le conducteur`}
            checked={isDriver}
            onPress={() => setIsDriver(c => !c)}
            containerStyle={{ marginBottom: 10 }}
          />

          {!isDriver && (
            <Input
              placeholder="Conducteur"
              // value={
              //   globalState?.attributionDamage?.[0]?.driverName
              // }
              value={driverName}
              onChangeText={value => setDriverName(value)}
            // onChangeText={value =>
            //   globalDispatch(
            //     addInfoDispatch(
            //       value,
            //       dispatchGeneralType,
            //       'driverName',
            //     ),
            //   )
            // }
            />
          )}

          <Input
            placeholder="Lieu de l'incident"
            value={location}
            onChangeText={value => setLocation(value)}
          // value={
          //   globalState?.attributionDamage?.[0]?.location
          // }
          // onChangeText={value =>
          //   globalDispatch(
          //     addInfoDispatch(
          //       value,
          //       dispatchGeneralType,
          //       'location',
          //     ),
          //   )
          // }
          />
          {/* 
          <StyledText style={{marginBottom: 10}}>
            {' '}
            Localisation des dommages{' '}
          </StyledText> */}

          <GradientButton
            text="Ajouter des photos du sinistre"
            handlePress={() => navigation.navigate('addDamage')}
          />

          {globalState.photoDamage.length > 0 &&

            <>
              <PicsFromB64
                picsArray={globalState.photoDamage}
                dispatchGeneralType={`photoDamage`}
              />

              <GradientButton
                text={`Envoyer Sinistre`}
                handlePress={handleSendDamage}
              />
            </>

          }

          {/* {damageArray.map((text, i) => (
            <DamageCheckBoxes
              index={i}
              key={text.key}
              navigation={navigation}
              text={text.text}
              nav={text.key}
              route={route}
              globalState={state}
            />
          ))} */}

          {/* <Input
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
              state?.attributionDamage?.[0]?.generalDamageInfo?.[0].commentDamage
            }
            placeholder="Commentaire"
            containerStyle={[generalStyles.textAeraContainer, {marginTop: 10}]}
            inputContainerStyle={generalStyles.textAeraContentContainer}
          /> */}

          {/* ICI RAJOTUER DES IFS SUR LES CHAMPS PAR EXEMPLE OU QU'IL Y AIE AU MOINS UNE TOFF !! */}
          {/* {state[`${dispatchGeneralType}`].length > 0 ? (
            <GradientButton
              text={`Envoyer Sinistre`}
              handlePress={handleSendDamage}
            />
          ) : null} */}

        </BottomBorderContainer>
      </TouchableOpacity>
    </ScrollView>
  );
}
