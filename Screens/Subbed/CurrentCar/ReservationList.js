import {ScrollView, Text, View, RefreshControl} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GradientButton} from '../../../comps';
import React from 'react';
import SingleKey from './SingleKey';
import SingleReservation from './SingleReservation';
import {StateContext} from '../../../Context/StateContext';
import StyledText from '../../../Shared/StyledText';
import {generalStyles} from '../../../Shared/css';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';
import { Button } from 'react-native-elements';

// Clé numérique
// Information sur la clé active
// Date attribution
// Date fin
// Option dépassement ? + délai (en heures ou jours)

 

function ReservationList({navigation}) {
  const {globalState} = React.useContext(StateContext);
  const {userState} = useGlobalContext();

  const [loading, setLoading] = React.useState(true);
  const [state, setGlobalState] = React.useState(globalState);
  const [errorLog, setErrorLog] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefreshVehiclesAndVirtualKeys = async () => {
    try {
      console.log("USER STATE", userState.user)
      let reservationsResult = await fetch(`${process.env.API_URL}/api/Vehicle/user/${userState.user?.[0].userGuid}`,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).catch((error) => setErrorLog(error.errorMessage));

      if(reservationsResult.ok) {
        const reservationsResultData = await reservationsResult.json()
        globalState.reservationVehicles = reservationsResultData;
      }

      let virtualKeysClientDevice = await KaaS.getVirtualKeys();
    
      globalState.virtualKeys = virtualKeysClientDevice
      globalState.reservationVehicles.sort(function(x, y) { return y.reservationStatus - x.reservationStatus });

      setRefreshing(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      console.error(error);
      // Set an error log if needed
      setErrorLog(error.errorMessage);
    }
  }

  React.useEffect(() => {
    setLoading(true);
    setTimeout(
      async () => {
        // Verify Session has opened in key list
        isSessionOpened = await KaaS.isSessionOpen()

        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
        await handleRefreshVehiclesAndVirtualKeys();
        setLoading(false);
      },

      10,
    );
  }, []);

  if (loading) {
    return (
      <View style={[generalStyles.center, {flex: 1}]}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <>
      {userState?.user?.[0].isVerified ? (
        <>
          {globalState?.reservationVehicles?.length > 0 ? (
            <View style={[generalStyles.container, {paddingVertical: 10}]}>
              <ScrollView 
                contentContainerStyle={generalStyles.scrollViewStyle}
                refreshControl={
                  <RefreshControl refreshing={refreshing} 
                    onRefresh={handleRefreshVehiclesAndVirtualKeys} />
                }>
                <StyledText style={{margin: 10, fontSize: 20}}>Validées</StyledText>
                {globalState?.reservationVehicles?.filter(rv => rv.reservationStatus === true).map(vehicle =>(
                  <SingleReservation
                    reservationVehicle={vehicle}
                    virtualKey = {globalState?.virtualKeys?.find(vk => vk.vehicleId === vehicle.continentalVehicleGuid)}
                    navigation={navigation}
                    key={vehicle.reservationGuid}
                  />
                ))}
                <StyledText style={{margin: 10, fontSize: 20}}>En attente</StyledText>
                {globalState?.reservationVehicles?.filter(rv => rv.reservationStatus === null).map(vehicle =>(
                  <SingleReservation
                    reservationVehicle={vehicle}
                    navigation={navigation}
                    key={vehicle.reservationGuid}
                  />
                ))}
                <StyledText style={{margin: 10, fontSize: 20}}>Refusées</StyledText>
                {globalState?.reservationVehicles?.filter(rv => rv.reservationStatus === false).map(vehicle =>(
                  <SingleReservation
                    reservationVehicle={vehicle}
                    navigation={navigation}
                    key={vehicle.reservationGuid}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View
              style={[
                generalStyles.center,
                generalStyles.colorContainer,
                generalStyles.center,
                {flex: 1},
              ]}>
              <StyledText style={{textAlign: 'center'}}>
                Vous ne disposez pas encore de réservations validée ou en attente, vous pouvez
                reserver une voiture en appuyant sur ce bouton
              </StyledText>

              <GradientButton
                handlePress={() => navigation.navigate('Vehicules')}
                addStyle={{marginTop: 65}}
                text={`Sélectionnez une voiture`}
              />
            </View>
          )}
        </>
      ) : (
        <View
          style={[
            generalStyles.center,
            generalStyles.colorContainer,
            generalStyles.center,
            {flex: 1},
          ]}>
          <StyledText style={{textAlign: 'center'}}>
            Avant de pouvoir reverver une voiture vous devez activer votre
            compte.{' '}
          </StyledText>

          <GradientButton
            handlePress={() =>
              navigation.navigate('Account', {screen: 'ActivateAccount'})
            }
            addStyle={{marginTop: 65}}
            text={`Envoyer vos documents`}
          />
        </View>
      )}
    </>
  );
}

export default ReservationList;
