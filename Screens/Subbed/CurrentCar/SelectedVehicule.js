// React stuffdsfdf
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

// global state / dispatch and their dispatchers fucntions
import { DispatchContext, StateContext } from '../../../Context/StateContext';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import { getSelectedVehicule, setCurrentkey } from '../../../Reducer/GlobalReducer/globalDispatch';

// Simple components
import { GradientButton } from '../../../comps';
// Component to show
import VehiculesInfo from './VehiculeInfos';
// global css
import { generalStyles } from '../../../Shared/css';

// import vehicules from '../../../JSON/CAR_MOCK_DATA.json';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';

// personal sumbit hook
import useSubmit from '../../../Hooks/useSubmit';

import { API_URL } from "@env"

// Fiche(s) véhicule(s) séléctionné
// Marque + modèle
// Numéro plaque d’immatriculation (API SIV ?) 
// le kilométrage actuel
// Type de contrat (location, en propre, etc.) + nom loueur + date de restitution
// Date prochaine maintenance

export default function SelectedVehicule({ navigation, route }) {

  ////////////////
  // Global State and userState
  ////////////////

  const { globalState } = React.useContext(StateContext);
  const { globalDispatch } = React.useContext(DispatchContext);
  const { userState } = useGlobalContext();

  // console.log(globalState.attributionInventory)

  ////////////////
  // Legacy comment : x) I DONT KNOW YET IF WE'LL MAKE A GET WITH THE VEHICULE OR THE VIRTUAL KEY
  ////////////////

  const { selectedVehicule, virtualKey, reservationTo } = route.params;
  const [errorLog, setErrorLog] = React.useState("");

  ////////////////
  // FUNCTION LAUCNHED BY THE FIRST USEEFFECT
  ////////////////

  const selectVirtualKeyAndConnectToDevice = (async (virtualKey) => {

    try {

      globalDispatch(setCurrentkey(virtualKey))

      if (virtualKey !== undefined && virtualKey.vehicleId === selectedVehicule.continentalVehicleGuid) {

        const selectedKey = await KaaS.selectVirtualKey(virtualKey.id)

        if (selectedKey) {
          await KaaS.connect()
        }
      }
    } catch (error) {
      setErrorLog(error.errorMessage);
    }

  })

  ////////////////
  // USEEFFECT FROM FIRST RENDER
  ////////////////

  React.useEffect(() => {
    selectVirtualKeyAndConnectToDevice(virtualKey);
    globalDispatch(getSelectedVehicule(selectedVehicule));
  }, []);

  ////////////////
  // HANDLE CLICK TO CREATE THE KEYS
  ////////////////

  const { handleSubmit: handleSubmitCreateKey, resMsg: responseVkCreated } = useSubmit()

  const handleCreateKey = e => {
    handleSubmitCreateKey({
      e,
      url: `${API_URL}/api/VirtualKey`,
      body: {
        userGuid: userState.user?.userGuid,
        vehicleGuid: selectedVehicule.vehicleGuid,
        virtualKeyFromDate: new Date().toJSON().slice(0, 10),
        virtualKeyToDate: reservationTo,
        clientDeviceGuid: userState.user?.userClientDeviceGuid,
        clientDeviceActionsAllowedBitfield: '11111111111111111111111111111111',
        clientDeviceNumberOfActionsAllowed: 0,
        virtualKeyLabel: `${userState.user?.fullName}VK`,
      },
    })
  }

  ////////////////
  // IF THE KEY CREATION WAS SUCCESSFULL
  ////////////////

  React.useEffect(() => {

    if (responseVkCreated && responseVkCreated.ok) {

      (async () => {

        try {
          let virtualKeysClientDevice = await KaaS.getVirtualKeys();

          if (virtualKeysClientDevice) {
            globalDispatch(setCurrentkey(virtualKeysClientDevice))
          }

        } catch (error) {
          console.error("Error fetching virtual keys:", error);
        }

      })()
    }

  }, [responseVkCreated]);

  ////////////////
  // JSX - Alot of stuff here is commented, we'll see if we use it later
  ////////////////

  return (

    <View style={[generalStyles.container]}>

      <ScrollView
        contentContainerStyle={generalStyles.scrollViewStyle}
        style={{ paddingVertical: 10 }}>

        {globalState ? (

          <>
            {/* <Text style={[generalStyles.title, { marginBottom: 5 }]}>Véhicule Séléctionné</Text> */}

            <VehiculesInfo
              style={[generalStyles.marginOverall]}
              vehicule={globalState?.currentCar}
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

              {globalState.currentVirtualKey === undefined || globalState.currentVirtualKey === null ? (

                <GradientButton
                  iconName="key"
                  iconSize={20}
                  iconColor="white"
                  text="Créer"
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
                  disabled={globalState.currentVirtualKey === undefined && globalState.currentVirtualKey === null}
                  handlePress={() =>
                    navigation.navigate('Actions', { vehicleGuid: selectedVehicule.vehicleGuid, virtualKeyGuid: globalState.currentVirtualKey.id })
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
