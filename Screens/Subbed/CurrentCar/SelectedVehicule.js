import {DispatchContext, StateContext} from '../../../Context/StateContext';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {GradientButton} from '../../../comps';
import HistoryKM from './HistoryKM';
import Octicons from 'react-native-vector-icons/Octicons';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import VehiculesInfo from './VehiculeInfos';
import {generalStyles} from '../../../Shared/css';
import {getSelectedVehicule} from '../../../Reducer/GlobalReducer/globalDispatch';
import vehicules from '../../../JSON/CAR_MOCK_DATA.json';
import { globalReducer } from '../../../Reducer/GlobalReducer/globalReducer';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';
import useGlobalContext from '../../../Hooks/useGlobalContext';

// Fiche(s) véhicule(s) séléctionné
// Marque + modèle
// Numéro plaque d’immatriculation (API SIV ?)
// le kilométrage actuel
// Type de contrat (location, en propre, etc.) + nom loueur + date de restitution
// Date prochaine maintenance

export default function SelectedVehicule({navigation, route}) {
  const {globalState} = React.useContext(StateContext);
  const {globalDispatch} = React.useContext(DispatchContext);
  const {userState} = useGlobalContext();

  // I DONT KNOW YET IF WE'LL MAKE A GET WITH THE VEHICULE OR THE VIRTUAL KEY
  const {vehicle, virtualKey, reservationTo} = route.params;
  const [state, setGlobalState] = React.useState(globalState);
  const [errorLog, setErrorLog] = React.useState("");

  React.useEffect(() => {
    const selectedVehicule = vehicle
    selectVirtualKeyAndConnectToDevice(virtualKey);
    globalDispatch(getSelectedVehicule(selectedVehicule));
  }, []);
  
  
 const selectVirtualKeyAndConnectToDevice = (async (vk) => {
  try {
    globalState.currentVirtualKey = vk
    if(vk !== undefined && vk.vehicleId === vehicle.continentalVehicleGuid)
      {
        const selectedKey = await KaaS.selectVirtualKey(vk.id)
        console.log(selectedKey)
        if(selectedKey !== undefined && selectedKey !== null)
        {
          await KaaS.connect()
        }
      }
  } catch (error) {
    // Handle any errors that occurred during the fetch request
    console.error(error);
    // Set an error log if needed
    setErrorLog(error.errorMessage);
  }
  
})

  React.useEffect(() => {
    setTimeout(
      async () => {
        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
      },

      300,
    );
  }, [globalState]);

  const handleCreateKey = async () => {
    try {
      let responseVkCreated = await fetch(`${process.env.API_URL}/api/VirtualKey`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fkUserGuid: userState.user?.[0].userGuid,
          fkVehicleGuid: vehicle.vehicleGuid,
          fromDate: new Date().toJSON().slice(0,10),
          toDate: reservationTo,
          fkClientDeviceGuid: userState.user?.[0].userClientDeviceGuid,
          clientDeviceActionsAllowedBitfield: '11111111111111111111111111111111',
          clientDeviceNumberOfActionsAllowed: 0,
          virtualKeyLabel: `${userState.user?.[0].fullName} VK`,
        }),
      }).catch((error) => setErrorLog(error.errorMessage));
      // Check if the response was successful
      if (responseVkCreated.ok) {
        let virtualKeysClientDevice = await KaaS.getVirtualKeys();
        globalState.virtualKeys = virtualKeysClientDevice

        globalState.currentVirtualKey = globalState.virtualKeys.find(vk => vk.vehicleId === vehicle.vehicleGuid)
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      console.error(error);
      // Set an error log if needed
      setErrorLog(error.errorMessage);
    }
  }

  ////////////////
  // JSX
  ////////////////
  
  return (
    <View style={[generalStyles.container]}>
      <ScrollView
        contentContainerStyle={generalStyles.scrollViewStyle}
        style={{paddingVertical: 10}}>
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
                {flexDirection: 'row', justifyContent: 'space-around'},
              ]}>
                {globalState.currentVirtualKey === undefined || globalState.currentVirtualKey === null  ? (
                  <GradientButton
                  iconName="key"
                  iconSize={20}
                  iconColor="white"
                  text="Récuperer"
                  borderRadius={50}
                  width={150}
                  buttonPadding={20}
                  addStyle={{marginBottom: 20}}
                  handlePress={handleCreateKey}>
                  </GradientButton>
                ) : (
                  <GradientButton
                    iconName="play"
                    iconSize={20}
                    iconColor="white"
                    text="actions"
                    borderRadius={50}
                    width={150}
                    buttonPadding={20}
                    addStyle={{marginBottom: 20}}
                    disabled={globalState.currentVirtualKey === undefined && globalState.currentVirtualKey === null}
                    handlePress={() =>
                      navigation.navigate('Actions', {vehicleGuid: vehicle.vehicleGuid, virtualKeyGuid: globalState.currentVirtualKey.id})
                    }></GradientButton>
                )}

              <GradientButton
                iconName="car-crash"
                iconSize={20}
                iconColor="white"
                text="Sinistre"
                width={150}
                buttonPadding={20}
                addStyle={{marginBottom: 20}}
                handlePress={() =>
                  navigation.navigate('Damage')
                }></GradientButton>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <GradientButton
                iconName="check-circle"
                iconSize={20}
                iconColor="white"
                text="Check In"
                addStyle={{marginBottom: 20}}
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
                addStyle={{marginBottom: 20}}
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
              addStyle={{marginBottom: 5}}
              handlePress={() => navigation.navigate('Vehicules')}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
