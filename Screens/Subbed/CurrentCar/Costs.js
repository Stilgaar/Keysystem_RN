import { DispatchContext, StateContext } from '../../../Context/StateContext';
import { ScrollView, Text, View } from 'react-native';
import {
  costPriceAdd,
  costSelectType,
  resetCost
} from '../../../Reducer/GlobalReducer/globalDispatch';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import DropDownPicker from 'react-native-dropdown-picker';
import { GradientButton } from '../../../comps';
import { Button, Input } from 'react-native-elements';
import PicsFromB64 from '../../../Shared/PicsFromB64';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generalStyles } from '../../../Shared/css';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import useGlobalContext from '../../../Hooks/useGlobalContext';

import useCostTypeFetch from '../../../Hooks/Fetchs/userCostTypeFetch';

import useSubmitFiles from "../../../Hooks/useSubmitFiles"

// TODO: Envoi des COSTS de manière sale

// Saisie des dépenses
// entretien,
// pneumatique,
// franchise accident,
// réparations,
// essence,
// peage... + divers (carrosserie…)

// Cotisation assurance => ça rime à rien

export default function Costs({ navigation, route }) {

  const { globalDispatch } = React.useContext(DispatchContext);
  const { globalState } = React.useContext(StateContext);

  const { dispatchGeneralType } = route.params;

  const { userState } = useGlobalContext()

  ////////////////
  // To open close the dropdown menu
  ////////////////

  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [showDateCost, setShowDateCost] = React.useState(false)

  const { handleSubmitFiles: handleAddCostWithFiles } = useSubmitFiles()

  const hanldeSubmitCost = e => {
    handleAddCostWithFiles({
      e,
      url: `${window.env.API_URL}/api/Cost`,
      body: {
        ...globalState[`${dispatchGeneralType}`],
        userGuid: userState.user.userGuid,
        vehicleGuid: globalState.currentCar.vehicleGuid

      }

    })
  }

  ////////////////
  // Language Picker (not bad !)
  ////////////////

  DropDownPicker.setLanguage('FR');
  DropDownPicker.setMode('BADGE');

  const { costTypeArray: items } = useCostTypeFetch(true, true)

  return (

    <View style={[generalStyles.container]}>

      <Button text={"reset"} onPress={() => globalDispatch(resetCost())}>RESET</Button>

      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>
          <TopBorderContainer>

            <StyledText>Gestion des coûts du véhicule</StyledText>

            <StyledText>Rajoutez les coûts de votre voiture</StyledText>

          </TopBorderContainer>

          <BottomBorderContainer>


            {items && items.length > 0 &&

              <View style={{ zIndex: 2 }}>

                <DropDownPicker
                  //  multiple={true}
                  open={dropDownOpen}
                  value={globalState?.[`${dispatchGeneralType}`]?.costType}
                  zIndex={5000}
                  zIndexInverse={1000}
                  dropDownMaxHeight={100}
                  elevation={5000} // Add elevation for Android
                  setOpen={setDropDownOpen}
                  items={items}
                  onSelectItem={item => globalDispatch(costSelectType(item))}
                  // setItems={setItems}
                  listMode="MODAL"
                  modalTitle="Séléctionnez un type de coût"
                  flatListProps={{
                    initialNumToRender: items.length
                  }}
                />

              </View>
            }


            <>
              {items && items.length > 0 && globalState?.[`${dispatchGeneralType}`]?.costType ? (
                items
                  .filter(
                    item =>
                      item.value ===
                      globalState?.[`${dispatchGeneralType}`]?.costType,
                  )
                  .map(filteredValue => (

                    <View
                      key={filteredValue.label}
                      style={[generalStyles.globalShadow, { marginTop: 15 }]}>

                      <Input
                        keyboardType="numeric"
                        value={globalState?.[`${dispatchGeneralType}`]?.costTotalHT}
                        label={`Montant :  ${filteredValue.label}`}
                        placeholder={`Prix ${filteredValue.label} HT`}
                        onChangeText={value =>
                          globalDispatch(costPriceAdd(value, 'costAmount'))
                        }
                      />

                      <Input
                        keyboardType="numeric"
                        value={globalState?.[`${dispatchGeneralType}`]?.costTotalTTC}
                        label={`Montant Additionnel :  ${filteredValue.label}`}
                        placeholder={`Prix ${filteredValue.label} HT`}
                        onChangeText={value =>
                          globalDispatch(costPriceAdd(value, 'costAdditionalCost'))
                        }
                      />

                      <StyledText>Date</StyledText>

                      <GradientButton
                        width={300}
                        handlePress={() => setShowDateCost(c => !c)}
                        addStyle={{ marginBottom: 5 }}
                        text={moment((globalState?.[`${dispatchGeneralType}`]?.costDoneDate).toJSON()).format('DD MMMM YYYY')}
                      />

                      {showDateCost &&

                        <DateTimePicker
                          value={new Date()}
                          mode="date"
                          onChange={(event, selected) => {
                            console.log("selected COST", selected)
                          }}
                        />

                      }

                    </View>
                  ))
              ) : (
                <>
                  <View style={[generalStyles.globalShadow, { marginTop: 15 }]}>
                    {Array(3)
                      .fill()
                      .map((_, index) => (
                        <Input
                          key={index}
                          label={`Choisissez un type de cout`}
                          placeholder={`Choisissez un type de cout`}
                        />
                      ))}
                  </View>
                </>
              )}
            </>

            <GradientButton
              text={`Ajouter Document`}
              addStyle={{ marginBottom: 5 }}
              handlePress={() => navigation.navigate('attributionCost')}
            />

            <PicsFromB64
              picsArray={
                globalState?.[`${dispatchGeneralType}`]?.['attributionCostDoc']
              }
              dispatchGeneralType={dispatchGeneralType}
              dispatchType={'attributionCostDoc'}
            />

            <GradientButton
              disabled={
                globalState[`${dispatchGeneralType}`].costAmount &&
                  globalState[`${dispatchGeneralType}`].costAdditionalCost &&
                  globalState[`${dispatchGeneralType}`].costDoneDate &&
                  globalState?.[`${dispatchGeneralType}`]?.['attributionCostDoc'].length > 0
                  ? false
                  : true
              }
              text={`Envoyer Coût`}
              handlePress={hanldeSubmitCost}
            />
          </BottomBorderContainer>

        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}
