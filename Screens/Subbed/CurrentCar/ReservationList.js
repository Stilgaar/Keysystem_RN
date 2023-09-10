import { ScrollView, Text, View, RefreshControl } from 'react-native';

import { GradientButton } from '../../../comps';
import React from 'react';
import SingleKey from './SingleKey';
import SingleReservation from './SingleReservation';
import { StateContext } from '../../../Context/StateContext';
import { DispatchContext } from '../../../Context/StateContext';
import StyledText from '../../../Shared/StyledText';
import { generalStyles } from '../../../Shared/css';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';

import { addVirtualKeysClientDevice } from '../../../Reducer/GlobalReducer/globalDispatch';
import useFetch from "../../../Hooks/useFetch"

// Clé numérique
// Information sur la clé active
// Date attribution
// Date fin
// Option dépassement ? + délai (en heures ou jours)

function ReservationList({ navigation }) {

  const { globalState } = React.useContext(StateContext);
  const { globalDispatch } = React.useContext(DispatchContext)
  const { userState } = useGlobalContext();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);

    // Simulated data fetching or any asynchronous task
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }

  const {
    data: vehicles,
    pending: pendingVehicles,
    refresh
  } = useFetch(`${process.env.API_URL}/api/Vehicle/user/${userState.user?.userGuid} `)

  React.useEffect(() => {

    if (vehicles && vehicles.length > 0) {
      (async () => {
        let virtualKeysClientDevice = await KaaS.getVirtualKeys();
        if (virtualKeysClientDevice) {
          globalDispatch(addVirtualKeysClientDevice(virtualKeysClientDevice, vehicles));
        }
      })();
    }

  }, [vehicles]);

  if (pendingVehicles) {

    return (
      <View style={[generalStyles.center, { flex: 1 }]}>
        <Text style={[generalStyles.title]}>Chargement ...</Text>
      </View>
    );

  }

  return (
    <>

      {userState?.user?.isVerified ? (

        <>

          {globalState.reservationVehicles && globalState.reservationVehicles.length > 0 ?

            <View style={[generalStyles.container, { paddingVertical: 10 }]}>

              <ScrollView
                contentContainerStyle={generalStyles.scrollViewStyle}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing}
                    onRefresh={handleRefresh} />
                }>

                <StyledText style={{ margin: 10, fontSize: 20 }}>
                  Validées
                </StyledText>

                {globalState
                  ?.reservationVehicles
                  ?.filter(rv => rv.reservationStatus === true)
                  .map(vehicle => (

                    <SingleReservation
                      reservationVehicle={vehicle}
                      virtualKey={globalState?.virtualKeys?.find(vk => vk.vehicleId === vehicle.continentalVehicleGuid)}
                      navigation={navigation}
                      key={vehicle.reservationGuid}
                    />

                  ))}

                <StyledText style={{ margin: 10, fontSize: 20 }}>En attente</StyledText>

                {globalState
                  ?.reservationVehicles
                  ?.filter(rv => rv.reservationStatus === null).map(vehicle => (

                    <SingleReservation
                      reservationVehicle={vehicle}
                      navigation={navigation}
                      key={vehicle.reservationGuid}
                    />

                  ))}

                <StyledText style={{ margin: 10, fontSize: 20 }}>Refusées</StyledText>

                {globalState?.reservationVehicles
                  ?.filter(rv => rv.reservationStatus === false)
                  .map(vehicle => (

                    <SingleReservation
                      reservationVehicle={vehicle}
                      navigation={navigation}
                      key={vehicle.reservationGuid}
                    />

                  ))}

              </ScrollView>

            </View>

            :

            <View
              style={[
                generalStyles.center,
                generalStyles.colorContainer,
                generalStyles.center,
                { flex: 1 },
              ]}>

              <StyledText style={{ textAlign: 'center' }}>
                Vous ne disposez pas encore de réservations validée ou en attente, vous pouvez
                reserver une voiture en appuyant sur ce bouton
              </StyledText>

              <GradientButton
                handlePress={() => navigation.navigate('Vehicules')}
                addStyle={{ marginTop: 65 }}
                text={`Sélectionnez une voiture`}
              />
            </View>
          }

        </>

      ) : (

        <View
          style={[
            generalStyles.center,
            generalStyles.colorContainer,
            generalStyles.center,
            { flex: 1 },
          ]}>

          <StyledText style={{ textAlign: 'center' }}>
            Avant de pouvoir reverver une voiture vous devez activer votre
            compte.{' '}
          </StyledText>

          <GradientButton
            handlePress={() =>
              navigation.navigate('Account', { screen: 'ActivateAccount' })
            }
            addStyle={{ marginTop: 65 }}
            text={`Envoyer vos documents`}
          />

        </View>

      )}

    </>

  );
}

export default ReservationList;
