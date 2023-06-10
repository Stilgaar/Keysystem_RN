import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';

import {DispatchContext} from '../../../Context/StateContext';
import {FilterEverything} from '../../../Functions/FilterAll';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {GradientButton} from '../../../comps';
import {Input} from 'react-native-elements';
import React from 'react';
import VehiculeSelect from './VehiculeSelect';
import {generalStyles} from '../../../Shared/css';
import {getSelectedVehiculeReseravation} from '../../../Reducer/GlobalReducer/globalDispatch';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import { StateContext } from '../../../Context/StateContext';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';

// import vehicleList from '../../../JSON/CAR_MOCK_DATA.json';

// Sélectionner un véhicule et voir toutes ses informations
// Demander la reservation d'un véhicule

// Faudra fetch ça plus tard

// import useFetch from "../../../Hooks/useFetch"

function SelectVehicle({navigation}) {
  
  const [errorLog, setErrorLog] = React.useState("");
  const [selectedVehicule, setSelectedVehicule] = React.useState({});
  const [searchVechicule, setSearchVehicule] = React.useState();
  const [searchModal, setSearchModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(true);
  
  const [filterType, setFilterType] = React.useState('all');
  
  const {globalDispatch} = React.useContext(DispatchContext);
  const {globalState} = React.useContext(StateContext);
  const {userState} = useGlobalContext();

  // const { data: vehicleList } = useFetch(`${process.env.API_URL}resetapiroad`)

  const handleRefreshCompanyVehicles = async () => {
    try {
      console.log("UserSate Vehicle Company", userState.user)
      let fetchCompanyVehicles = await fetch(`${process.env.API_URL}/api/Company/${userState.user?.[0].companyGuid}/vehicles`,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).catch((error) => setErrorLog(error.errorMessage));

      if(fetchCompanyVehicles.ok) {
        const fetchCompanyVehiclesData = await fetchCompanyVehicles.json()
        globalState.companyVehicles = fetchCompanyVehiclesData;
        console.log("Company Vehicles STATE: ", globalState.companyVehicles)
        console.log("Company Vehicles STATE LENGTH: ", globalState.companyVehicles.length)
      }

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
        await handleRefreshCompanyVehicles();
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
          {globalState.companyVehicles ? (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={[generalStyles.container]}>
              <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}refreshControl={
                  <RefreshControl refreshing={refreshing} 
                    onRefresh={handleRefreshCompanyVehicles} />
                }>
                <View
                  style={[generalStyles.center, {backgroundColor: 'white'}]}>
                  <View
                    style={{flexDirection: 'row', paddingBottom: 5, gap: 10}}>
                    <GradientButton
                      width={80}
                      text={`Tous`}
                      buttonPadding={10}
                      disabled={filterType === 'all'}
                      handlePress={() => setFilterType('all')}
                    />

                    <GradientButton
                      width={80}
                      buttonPadding={10}
                      disabled={filterType === 'used'}
                      text={`Passés`}
                      handlePress={() => setFilterType('used')}
                    />

                    <GradientButton
                      width={80}
                      buttonPadding={10}
                      text={`Libres`}
                      disabled={filterType === 'free'}
                      handlePress={() => setFilterType('free')}
                    />
                  </View>

                  <View style={{position: 'absolute', right: 7}}>
                    <TouchableOpacity onPress={() => setSearchModal(c => !c)}>
                      <FontAwesome5 name="search" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[{backgroundColor: 'white', paddingTop: 5}]}>
                  {searchModal && (
                    <Input
                      placeholder={`Cherchez par modèle, type, plaque`}
                      onChangeText={text => setSearchVehicule(text)}
                    />
                  )}
                </View>

                {globalState.companyVehicles
                  ?.filter(value => {
                    return FilterEverything(value, searchVechicule);
                  })
                  ?.filter(value => {
                    if (filterType === 'all') {
                      return value;
                    } else if (filterType === 'free') {
                      return !value.vehicleIsUsed;
                    } else if (filterType === 'used') {
                      return value.vehicleUsed;
                    }
                  })
                  .map((vehicle, i) => (
                    <React.Fragment key={i}>
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          if (
                            selectedVehicule.vehicleGuid ===
                            vehicle.vehicleGuid
                          ) {
                            setSelectedVehicule({});
                          } else {
                            setSelectedVehicule(vehicle);
                          }
                        }}
                        style={{
                          marginLeft: 3,
                          marginRight: 3,
                          marginBottom: 2,
                          marginTop: i === 0 ? 3 : 0,
                        }}>
                        <VehiculeSelect
                          vehicle={vehicle}
                          selectedVehicule={selectedVehicule}
                        />
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
              </ScrollView>

              {Object.keys(selectedVehicule).length > 0 && (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      paddingVertical: 10,
                    },
                  ]}>
                  {/* <GradientButton
                    text={`Disponibilités`}
                    width={170}
                    handlePress={() =>
                      navigation.navigate('VehiculeCalendar', {
                        vehicleGuid: selectedVehicule.vehicleGuid,
                      })
                    }
                  /> */}

                  <GradientButton
                    text={`Réserver`}
                    width={170}
                    handlePress={() => {
                      globalDispatch(
                        getSelectedVehiculeReseravation(selectedVehicule),
                      );
                      navigation.navigate('MakeReservation', {
                        vehicule: selectedVehicule,
                        navigation: {navigation}
                      });
                    }}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          ) : (
            <>
              <Text style={generalStyles.title}>Aucune voiture disponible</Text>
            </>
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
          <Text style={{textAlign: 'center'}}>
            Avant de pouvoir reverver une voiture vous devez activer votre
            compte.{' '}
          </Text>

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

export default SelectVehicle;
