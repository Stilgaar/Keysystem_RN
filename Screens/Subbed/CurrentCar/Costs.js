import { DispatchContext, StateContext } from '../../../Context/StateContext';
import { ScrollView, Text, View } from 'react-native';
import {
  costAddInfo,
  costSelectType,
  resetCost
} from '../../../Reducer/GlobalReducer/globalDispatch';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import DropDownPicker from 'react-native-dropdown-picker';
import { GradientButton } from '../../../comps';
import { Input } from 'react-native-elements';
import { formatDate } from "../../../Functions/DisplayFunctions"
import PicsFromB64 from '../../../Shared/PicsFromB64';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generalStyles } from '../../../Shared/css';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import useGlobalContext from '../../../Hooks/useGlobalContext';

import useCostTypeFetch from '../../../Hooks/Fetchs/userCostTypeFetch';

import useSubmitFiles from "../../../Hooks/useSubmitFiles"

import { API_URL } from "@env"

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

  const [costDoneDate, setCostDoneDate] = React.useState(new Date())

  const { handleSubmitFiles: handleAddCostWithFiles, resMsg: resMsgCost } = useSubmitFiles()

  const hanldeSubmitCost = e => {
    handleAddCostWithFiles({
      e,
      url: `${API_URL}/api/Cost`,
      body: {
        ...globalState[`${dispatchGeneralType}`],
        costDoneDate: formatDate(costDoneDate),
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

  const { costTypeArray, pendingCostType } = useCostTypeFetch(true, true)

  return (

    <View style={[generalStyles.container]}>

      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>
          <TopBorderContainer>

            <StyledText>Gestion des coûts du véhicule</StyledText>

            <StyledText>Rajoutez les coûts de votre voiture</StyledText>

          </TopBorderContainer>

          <BottomBorderContainer>


            {!pendingCostType && costTypeArray && costTypeArray.length > 0 &&

              <View style={{ zIndex: 2 }}>

                <DropDownPicker
                  //  multiple={true}
                  open={dropDownOpen}
                  value={globalState?.[`${dispatchGeneralType}`]?.costTypeGuid}
                  zIndex={5000}
                  zIndexInverse={1000}
                  dropDownMaxHeight={100}
                  elevation={5000} // Add elevation for Android
                  setOpen={setDropDownOpen}
                  items={costTypeArray}
                  onSelectItem={costTypeArray => globalDispatch(costSelectType(costTypeArray))}
                  // setItems={setItems}
                  listMode="MODAL"
                  modalTitle="Séléctionnez un type de coût"
                  flatListProps={{
                    initialNumToRender: costTypeArray.length
                  }}
                />

              </View>
            }


            <>
              {costTypeArray && costTypeArray.length > 0 && globalState?.[`${dispatchGeneralType}`]?.costTypeGuid ? (
                costTypeArray
                  .filter(
                    item =>
                      item.value ===
                      globalState?.[`${dispatchGeneralType}`]?.costTypeGuid,
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
                          globalDispatch(costAddInfo(parseInt(value), 'costAmount'))
                        }
                      />

                      <Input
                        keyboardType="numeric"
                        value={globalState?.[`${dispatchGeneralType}`]?.costTotalTTC}
                        label={`Montant Additionnel :  ${filteredValue.label}`}
                        placeholder={`Prix ${filteredValue.label} HT`}
                        onChangeText={value =>
                          globalDispatch(costAddInfo(parseInt(value), 'costAdditionalCost'))
                        }
                      />

                      <StyledText>Date</StyledText>

                      <GradientButton
                        width={300}
                        handlePress={() => setShowDateCost(true)}
                        addStyle={{ marginBottom: 5 }}
                        text={moment(costDoneDate.toJSON()).format('DD MMMM YYYY')}
                      />

                      {showDateCost &&

                        <DateTimePicker
                          value={costDoneDate}
                          mode="date"
                          onChange={(event, selected) => {
                            setCostDoneDate(selected)
                            setShowDateCost(false)
                          }}
                        />

                      }

                    </View>
                  ))
              ) : (
                <>
                  <View style={[generalStyles.globalShadow, { marginTop: 15 }]}>

                    {Array(2)
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

            {/* {console.log("GLOBALSTATE", dispatchGeneralType, globalState?.[`${dispatchGeneralType}`]?.['attributionDocs'])} */}

            <GradientButton
              text={`Ajouter Document`}
              addStyle={{ marginBottom: 5 }}
              handlePress={() => navigation.navigate('attributionCost')}
            />

            <PicsFromB64
              picsArray={
                globalState?.[`${dispatchGeneralType}`]?.['attributionDocs']
              }
              dispatchGeneralType={dispatchGeneralType}
              dispatchType={'attributionDocs'}
            />

            <GradientButton
              disabled={
                globalState[`${dispatchGeneralType}`].costAmount &&
                  globalState[`${dispatchGeneralType}`].costAdditionalCost &&
                  globalState[`${dispatchGeneralType}`].costDoneDate
                  // globalState[`${dispatchGeneralType}`]['attributionDocs'].length > 0
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
