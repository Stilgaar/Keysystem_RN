import { DispatchContext, StateContext } from '../../../Context/StateContext';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  checkInInfoArray,
  checkOutInfoArray,
} from '../../../JSON/Fr/InventoryArray';

import { formatDate } from "../../../Functions/DisplayFunctions"

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import DamageCheckBoxes from './DamageCheckBoxes';
import { GradientButton } from '../../../comps';
import { Input } from 'react-native-elements';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import { addInfoDispatch } from '../../../Reducer/GlobalReducer/globalDispatch';
import { generalStyles } from '../../../Shared/css';
import { inventoryArray } from '../../../JSON/Fr/InventoryArray';

import useSubmitFiles from '../../../Hooks/useSubmitFiles';
import { API_URL } from "@env"
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

export default function Inventory({ navigation, route }) {

  console.log("ROUTE INVENTORY", route.name)

  const { globalState } = React.useContext(StateContext);
  const { globalDispatch } = React.useContext(DispatchContext);
  const { userState } = useGlobalContext()

  const [lectureArray, setLectureArray] = React.useState();

  React.useEffect(() => {
    route.name === 'CheckIn'
      ? setLectureArray(checkInInfoArray)
      : setLectureArray(checkOutInfoArray);
  }, []);

  const { handleSubmitFiles } = useSubmitFiles()

  const dateNow = formatDate(new Date())

  const handleAddInventory = e => {
    handleSubmitFiles({
      e,
      url: `${API_URL}/api/Inventory`,
      body: {
        ...globalState.attributionInventory,
        inventoryTypeGuid: route.name === "CheckIn" ? "7c713fb7-9259-4e7c-89f2-f9212d07b129" : "c9f938d9-278f-434a-9da3-0a3997902d17",
        userGuid: userState.user.userGuid,
        vehicleGuid: globalState.currentCar.vehicleGuid,
        inventoryDoneDate: dateNow,
      }
    })
  }

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
              style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>

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
          style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>

          <TopBorderContainer>

            <StyledText style={{ textAlign: 'center', marginBottom: 5 }}>
              Commentaire
            </StyledText>

          </TopBorderContainer>

          <BottomBorderContainer>

            {/* <Input
              style={{ textAlignVertical: 'top' }}
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
              value={globalState?.[`${dispatchGeneralType}`]?.commentInventory}
              placeholder="Commentaire"
              containerStyle={[
                generalStyles.textAeraContainer,
                { marginTop: 10 },
              ]}
              inputContainerStyle={generalStyles.textAeraContentContainer}
            /> */}

            {inventoryArray.map((text, index) => (

              <DamageCheckBoxes
                routeType={route?.inventoryZoneGuid}
                index={index}
                key={text.inventoryZoneGuid}
                navigation={navigation}
                text={text.descriptionFr}
                nav={text.inventoryZoneGuid}
                route={route}
                globalState={globalState}
              />

            ))}

            <GradientButton
              text={`Envoyer Etat des lieux`}
              handlePress={handleAddInventory}
            />

          </BottomBorderContainer>

        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}
