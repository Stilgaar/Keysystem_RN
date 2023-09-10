import { DispatchContext, StateContext } from '../../../Context/StateContext';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { GradientButton } from '../../../comps';
import HistoryKM from './HistoryKM';
import Octicons from 'react-native-vector-icons/Octicons';
import React, { useEffect } from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import VehiculesInfo from './VehiculeInfos';
import { generalStyles } from '../../../Shared/css';
import { getSelectedVehicule } from '../../../Reducer/GlobalReducer/globalDispatch';
import vehicules from '../../../JSON/CAR_MOCK_DATA.json';
import { globalReducer } from '../../../Reducer/GlobalReducer/globalReducer';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';
import useGlobalContext from '../../../Hooks/useGlobalContext';

import useSubmit from '../../../Hooks/useSubmit';

// Fiche(s) véhicule(s) séléctionné
// Marque + modèle
// Numéro plaque d’immatriculation (API SIV ?)
// le kilométrage actuel
// Type de contrat (location, en propre, etc.) + nom loueur + date de restitution
// Date prochaine maintenance

export default function SelectedVehicule({ navigation, route }) {
  const { globalState } = React.useContext(StateContext);
  const { globalDispatch } = React.useContext(DispatchContext);
  const { userState } = useGlobalContext();

  // I DONT KNOW YET IF WE'LL MAKE A GET WITH THE VEHICULE OR THE VIRTUAL KEY
  const { vehicle, virtualKey, reservationTo } = route.params;
  const [state, setGlobalState] = React.useState(globalState);
  const [errorLog, setErrorLog] = React.useState("");

  const selectedVehicule = vehicle

  const selectVirtualKeyAndConnectToDevice = (async (vk) => {

    try {

      globalState.currentVirtualKey = vk
      if (vk !== undefined && vk.vehicleId === vehicle.continentalVehicleGuid) {
        const selectedKey = await KaaS.selectVirtualKey(vk.id)
        if (selectedKey !== undefined && selectedKey !== null) {
          await KaaS.connect()
        }
      }
    } catch (error) {
      setErrorLog(error.errorMessage);
    }

  })

  React.useEffect(() => {
    selectVirtualKeyAndConnectToDevice(virtualKey);
    globalDispatch(getSelectedVehicule(selectedVehicule));
  }, []);

  React.useEffect(() => {

    setTimeout(
      async () => {
        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
      },

      300,
    );
  }, [globalState]);


  const { handleSubmit: handleSubmitCreateKey, resMsg: responseVkCreated } = useSubmit()

  const handleCreateKey = e => {
    handleSubmitCreateKey({
      e,
      url: `${process.env.API_URL}/api/VirtualKey`,
      body: {
        userGuid: userState.user?.userGuid,
        vehicleGuid: vehicle.vehicleGuid,
        virtualKeyFromDate: new Date().toJSON().slice(0, 10),
        virtualKeyToDate: reservationTo,
        clientDeviceGuid: userState.user?.userClientDeviceGuid,
        clientDeviceActionsAllowedBitfield: '11111111111111111111111111111111',
        clientDeviceNumberOfActionsAllowed: 0,
        virtualKeyLabel: `${userState.user?.fullName}VK`,
      },
    })
  }

  // Check if the response was successful

  useEffect(() => {

    if (responseVkCreated && responseVkCreated.ok) {

      (async () => {

        let virtualKeysClientDevice = await KaaS.getVirtualKeys();

        globalDispatch(setCurrentkey(virtualKeysClientDevice))

      })()
    }

  }, [responseVkCreated]);

  ////////////////
  // JSX
  ////////////////

  return (

    <View style={[generalStyles.container]}>

      <ScrollView
        contentContainerStyle={generalStyles.scrollViewStyle}
        style={{ paddingVertical: 10 }}>

        {state ? (
          <>
            {/* <Text style={[generalStyles.title, { marginBottom: 5 }]}>Véhicule Séléctionné</Text> */}

            <VehiculesInfo
              style={[generalStyles.marginOverall]}
              vehicule={state?.currentCar}
              navigation={navigation}
            />

            {/* <HistoryKM
              style={[generalStyles.marginOverall, {marginTop: 10}]}
              data={state?.currentCar}
            /> */}

            <View
              style={[
                generalStyles.marginOverall,
                { flexDirection: 'row', justifyContent: 'space-around' },
              ]}>

              {state.currentVirtualKey === undefined || state.currentVirtualKey === null ? (

                <GradientButton
                  iconName="key"
                  iconSize={20}
                  iconColor="white"
                  text="Crée"
                  borderRadius={50}
                  width={150}
                  buttonPadding={20}
                  addStyle={{ marginBottom: 20 }}
                  handlePress={handleCreateKey} />

              ) : (

                <GradientButton
                  iconName="play"
                  iconSize={20}
                  iconColor="white"
                  text="actions"
                  borderRadius={50}
                  width={150}
                  buttonPadding={20}
                  addStyle={{ marginBottom: 20 }}
                  disabled={state.currentVirtualKey === undefined && state.currentVirtualKey === null}
                  handlePress={() =>
                    navigation.navigate('Actions', { vehicleGuid: vehicle.vehicleGuid, virtualKeyGuid: state.currentVirtualKey.id })
                  } />

              )}

              <GradientButton
                iconName="car-crash"
                iconSize={20}
                iconColor="white"
                text="Sinistre"
                width={150}
                buttonPadding={20}
                addStyle={{ marginBottom: 20 }}
                handlePress={() =>
                  navigation.navigate('Damage')
                } />
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <GradientButton
                iconName="check-circle"
                iconSize={20}
                iconColor="white"
                text="Check In"
                addStyle={{ marginBottom: 20 }}
                width={150}
                buttonPadding={20}
                handlePress={() =>
                  navigation.navigate('CheckIn')
                }></GradientButton>
              {/* 
                        <GradientButton text="Check Out"
                           width={150}
                                buttonPadding={25}
                            addStyle={{ marginBottom: 5 }}
                            handlePress={() => navigation.navigate("CheckOut")} >
                            
                             <FontAwesome5 name="check-circle" size={25} color="black" />
                             </GradientButton>*/}

              <GradientButton
                iconName="euro-sign"
                iconSize={20}
                iconColor="white"
                text="Coûts"
                addStyle={{ marginBottom: 20 }}
                width={150}
                buttonPadding={20}
                handlePress={() =>
                  navigation.navigate('Costs')
                }></GradientButton>
            </View>
          </>
        ) : (
          <>
            <Text style={generalStyles.title}>
              Vous n'avez pas de clefs numérique ou de clefs assignés
            </Text>

            <GradientButton
              text="Choisir une voiture"
              addStyle={{ marginBottom: 5 }}
              handlePress={() => navigation.navigate('Vehicules')}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
