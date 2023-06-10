import {DispatchContext, StateContext} from '../../../Context/StateContext';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  checkInInfoArray,
  checkOutInfoArray,
} from '../../../JSON/Fr/InventoryArray';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import DamageCheckBoxes from './DamageCheckBoxes';
import {GradientButton} from '../../../comps';
import {Input} from 'react-native-elements';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {addInfoDispatch} from '../../../Reducer/GlobalReducer/globalDispatch';
import {generalStyles} from '../../../Shared/css';
import {inventoryArray} from '../../../JSON/Fr/InventoryArray';
// TODO: Envoi d'un INVENTORY de manière sale

//CHECK IN
// Localisation du/des dommage(s) grâce aux photos
// Commentaires

// CHECK OUT
// Clôturer mon emprunt
// Date et heure de fin => automatique au submit
// Commentaires
// Enregistrement position véhicule => hmmm ?
// Etats des lieux => photos

export default function Inventory({navigation, route}) {
  const {dispatchGeneralType} = route.params;

  const {globalState} = React.useContext(StateContext);
  const {globalDispatch} = React.useContext(DispatchContext);

  const [state, setGlobalState] = React.useState(globalState);

  React.useEffect(() => {
    setTimeout(
      async () => {
        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
      },

      10,
    );
  }, [globalState]);

  const [lectureArray, setLectureArray] = React.useState();

  React.useEffect(() => {
    route.name === 'CheckIn'
      ? setLectureArray(checkInInfoArray)
      : setLectureArray(checkOutInfoArray);
  }, []);

  ////////////////
  // JSX
  ////////////////

  return (
    <View style={[generalStyles.container]}>
      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>
        {lectureArray?.map(display => (
          <React.Fragment key={display.title}>
            <TouchableOpacity
              activeOpacity={1}
              style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
              <TopBorderContainer>
                <StyledText style={generalStyles.titleInfo}>
                  {display.text1}
                </StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText>{display.text2}</StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
          <TopBorderContainer>
            <StyledText style={{textAlign: 'center', marginBottom: 5}}>
              Commentaire
            </StyledText>
          </TopBorderContainer>
          <BottomBorderContainer>
            <Input
              style={{textAlignVertical: 'top'}}
              multiline={true}
              numberOfLines={5}
              onChangeText={value =>
                globalDispatch(
                  addInfoDispatch(
                    value,
                    dispatchGeneralType,
                    'generalInventoryInfo',
                    'commentInventory',
                  ),
                )
              }
              value={
                globalState?.[`${dispatchGeneralType}`]?.[0]
                  ?.generalInventoryInfo?.[0].commentInventory
              }
              placeholder="Commentaire"
              containerStyle={[
                generalStyles.textAeraContainer,
                {marginTop: 10},
              ]}
              inputContainerStyle={generalStyles.textAeraContentContainer}
            />

            <GradientButton
              style={{paddingVertical: 10}}
              addStyle={{marginBottom: 10}}
              width={250}
              handlePress={() =>
                navigation.navigate('inventoryGeneralFrontPanel', {
                  routeType: route.name,
                })
              }
              text={`Commencer l'état des lieux`}
            />

            {state?.[`${dispatchGeneralType}`].some(obj =>
              inventoryArray
                .map(item => item.key)
                .includes(Object.keys(obj)[0]),
            ) &&
              inventoryArray.map((text, index) => (
                <DamageCheckBoxes
                  routeType={route?.name}
                  index={index}
                  key={text.key}
                  navigation={navigation}
                  text={text.text}
                  nav={text.key}
                  route={route}
                  globalState={globalState}
                />
              ))}

            {state[`${dispatchGeneralType}`].length > 10 ? (
              <GradientButton
                text={`Envoyer Etat des lieux`}
                handlePress={() => {
                  console.log('INVENTORY TYPE :', route.name);
                  console.log('INVENTORY : ', state[`${dispatchGeneralType}`]);
                }}
              />
            ) : null}
          </BottomBorderContainer>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
