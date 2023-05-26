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

// Fiche(s) véhicule(s) séléctionné
// Marque + modèle
// Numéro plaque d’immatriculation (API SIV ?)
// le kilométrage actuel
// Type de contrat (location, en propre, etc.) + nom loueur + date de restitution
// Date prochaine maintenance

export default function SelectedVehicule({navigation, route}) {
  const {globalState} = React.useContext(StateContext);
  const {globalDispatch} = React.useContext(DispatchContext);

  // I DONT KNOW YET IF WE'LL MAKE A GET WITH THE VEHICULE OR THE VIRTUAL KEY
  const {vehiculeGUID, virtualKeyGUID} = route.params;

  React.useEffect(() => {
    const selectedVehicule = vehicules.filter(
      vechiule => vechiule.vehiculeGUID === vehiculeGUID,
    );

    globalDispatch(getSelectedVehicule(selectedVehicule));
  }, []);

  const [state, setGlobalState] = React.useState(globalState);

  React.useEffect(() => {
    setTimeout(
      async () => {
        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
      },

      300,
    );
  }, [globalState]);

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
              vehicule={state?.currentCar?.[0]}
              navigation={navigation}
            />

            <HistoryKM
              style={[generalStyles.marginOverall, {marginTop: 10}]}
              data={state?.currentCar?.[0]}
            />

            <View
              style={[
                generalStyles.marginOverall,
                {flexDirection: 'row', justifyContent: 'space-around'},
              ]}>
              <GradientButton
                iconName="play"
                iconSize={20}
                iconColor="white"
                text="action"
                borderRadius={50}
                width={150}
                buttonPadding={20}
                addStyle={{marginBottom: 20}}
                handlePress={() =>
                  navigation.navigate('Actions', {vehiculeGUID, virtualKeyGUID})
                }></GradientButton>

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
