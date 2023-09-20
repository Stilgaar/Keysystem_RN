import { ScrollView, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import { GradientButton } from '../../../comps';
import PicsFromB64 from '../../../Shared/PicsFromB64';
import PicsFromSVG from '../../../Shared/PicsFromSVG';
import React from 'react';
import Spacer from '../../../Shared/Spacer';
import { StateContext } from '../../../Context/StateContext';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { activateAccountList } from '../../../JSON/Fr/MyAccountArray';
// import { delSignature } from '../../../Reducer/GlobalReducer/globalDispatch';
import { generalStyles } from '../../../Shared/css';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// Activer mon compte utilisateur
// Upload documents (avec carte d'identité et permis de conduire)
// + Signature électronique
// + Saisie des dates d'expirations

import { API_URL } from "@env"

export default function ActivateAccount({ navigation }) {
  const { globalState } = React.useContext(StateContext);

  const [errorlog, setErrorLog] = React.useState("")

  const { userState } = useGlobalContext();

  const [idStartDate, setIdStartDate] = React.useState(new Date());
  const [idToDate, setIdToDate] = React.useState(new Date(idStartDate.getFullYear(), idStartDate.getMonth(), idStartDate.getDate() + 1));
  const [showStartIdPicker, setShowIdStartPicker] = React.useState(false);
  const [showEndIdPicker, setShowIdEndPicker] = React.useState(false);

  console.log("PHOTOID", globalState.photoID)

  const [licenseStartDate, setLicenseStartDate] = React.useState(new Date());
  const [licenseToDate, setLicenseToDate] = React.useState(new Date(licenseStartDate.getFullYear(), licenseStartDate.getMonth(), licenseStartDate.getDate() + 1));

  const [showStartLicensePicker, setShowLicenseStartPicker] = React.useState(false);
  const [showEndLicensePicker, setShowLicenseEndPicker] = React.useState(false);

  const handleSubmitIdDocs = async () => {
    try {
      idStartDate.setHours(0, 0, 0, 0)
      idToDate.setHours(0, 0, 0, 0)
      const formData = new FormData()
      formData.append(`UserGuid`, userState?.user?.userGuid)

      const attributionDocs = []
      if ((globalState.photoID !== undefined || globalState.photoID !== null)) {
        globalState.photoID.forEach(photo => {
          const attributionIdElement =
          {
            documentFormFile: { uri: photo.documentFormFile.uri, type: 'image/jpeg', name: photo.documentFormFile.name },
            displayName: `Pièce d'identité`,
            userDocumentTypeGuid: `340a5e3e-fe50-11ed-be56-0242ac120002`,
            validFromDate: idStartDate.toJSON(),
            validToDate: idToDate.toJSON(),
            details: ``
          }
          attributionDocs.push(attributionIdElement)
        });

        if (attributionDocs.length > 0) {
          attributionDocs.forEach((doc, index) => {
            // Append the file
            const file = doc.documentFormFile;
            formData.append(`attributionDocs[${index}].DocumentFormFile`, file);

            // Append the display name
            const displayName = doc.displayName || 'DefaultName';
            formData.append(`attributionDocs[${index}].DisplayName`, displayName);

            // Append the document type Guid
            formData.append(`attributionDocs[${index}].UserDocumentTypeGuid`, doc.userDocumentTypeGuid);

            // Append the valid from date
            formData.append(`attributionDocs[${index}].ValidFromDate`, doc.validFromDate);


            // Append the valid to date
            formData.append(`attributionDocs[${index}].ValidToDate`, doc.validToDate);

            // Append the details
            formData.append(`attributionDocs[${index}].Details`, doc.details);
          })
        }
      }
      else throw new Error('You should at least send one document')

      console.log("FORM DATA ACTIVATE ACCOUNT ====> ", formData)

      let postUserDocument = await fetch(`${API_URL}/api/UserDocument`, {
        method: 'POST',
        body: formData
      });
      console.log("OK ? ========> ", postUserDocument.ok)
    } catch (e) {
      // Handle any errors that occurred during the fetch request
      console.error(e);
      // Set an error log if needed
      setErrorLog(e.errorMessage);
    }
  }

  const handleSubmitLicence = async () => {
    try {
      licenseStartDate.setHours(0, 0, 0, 0)
      licenseToDate.setHours(0, 0, 0, 0)
      const formData = new FormData()
      formData.append(`UserGuid`, userState?.user?.userGuid)
      const attributionDocs = []

      if ((globalState.photoLicence !== undefined || globalState.photoLicence !== null)) {
        globalState.photoLicence.forEach(photo => {
          const attributionLicenceElement =
          {
            documentFormFile: { uri: photo.documentFormFile.uri, type: 'image/jpeg', name: photo.documentFormFile.name },
            displayName: `Permis de conduire`,
            userDocumentTypeGuid: `0ef95cd2-fe53-11ed-be56-0242ac120002`,
            validFromDate: licenseStartDate.toJSON(),
            validToDate: licenseToDate.toJSON(),
            details: ``
          }
          attributionDocs.push(attributionLicenceElement)
        });

        if (attributionDocs.length > 0) {
          attributionDocs.forEach((doc, index) => {
            // Append the file
            const file = doc.documentFormFile;
            formData.append(`attributionDocs[${index}].DocumentFormFile`, file);

            // Append the display name
            const displayName = doc.displayName || 'DefaultName';
            formData.append(`attributionDocs[${index}].DisplayName`, displayName);

            // Append the document type Guid
            formData.append(`attributionDocs[${index}].UserDocumentTypeGuid`, doc.userDocumentTypeGuid);

            // Append the valid from date
            formData.append(`attributionDocs[${index}].ValidFromDate`, doc.validFromDate);

            // Append the valid to date
            formData.append(`attributionDocs[${index}].ValidToDate`, doc.validToDate);

            // Append the details
            formData.append(`attributionDocs[${index}].Details`, doc.details);
          })
        }
      }
      else throw new Error('You should at least send one document')

      console.log("FORM DATA ====> ", formData)

      let postUserDocument = await fetch(`${API_URL}/api/UserDocument`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
      console.log("OK ? ========> ", postUserDocument.ok)
    } catch (e) {
      // Handle any errors that occurred during the fetch request
      console.error(e);
      // Set an error log if needed
      setErrorLog(e.errorMessage);
    }
  }

  // const handleSubmitSignature = async () => {

  // }

  // const handleSubmitAll = async () => {

  // }

  return (
    <View style={[generalStyles.container]}>

      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>

          <TopBorderContainer>

            <StyledText>Activation de votre compte</StyledText>

          </TopBorderContainer>

          <BottomBorderContainer>

            <StyledText style={{ marginBottom: 5 }}>
              Pour activer votre compte nous avons besoin des documents suivants  :
            </StyledText>

            {activateAccountList.map(list => (
              <StyledText style={{ marginLeft: 15, marginTop: 2 }} key={list}>
                * {list}
              </StyledText>
            ))}

          </BottomBorderContainer>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>
          <TopBorderContainer>
            <StyledText>Ajouter un document</StyledText>
          </TopBorderContainer>
          <BottomBorderContainer>
            <GradientButton
              text="Piece d'identité"
              handlePress={() => navigation.navigate('addId')}
            />

            {globalState.photoID.length > 0 && (
              <>
                <PicsFromB64
                  picsArray={globalState.photoID}
                  dispatchGeneralType={`photoID`}
                />

                <StyledText>Délivrée le:</StyledText>
                <GradientButton
                  width={300}
                  handlePress={() => setShowIdStartPicker(true)}
                  addStyle={{ marginBottom: 5 }}
                  text={moment(idStartDate.toJSON()).format('DD MMMM YYYY')} />

                <StyledText>Expire le:</StyledText>
                <GradientButton
                  width={300}
                  handlePress={() => setShowIdEndPicker(true)}
                  addStyle={{ marginBottom: 5 }}
                  text={moment(idToDate.toJSON()).format('DD MMMM YYYY')} />

                {showStartIdPicker && (
                  <DateTimePicker
                    value={idStartDate}
                    mode="date"
                    onChange={(event, selected) => {
                      setIdStartDate(selected)
                      setShowIdStartPicker(false)
                    }}
                  />
                )}

                {showEndIdPicker && (
                  <DateTimePicker
                    value={idToDate}
                    mode="date"
                    onChange={(event, selected) => {
                      setIdToDate(selected)
                      setShowIdEndPicker(false)
                    }}
                  />
                )}

                <Spacer size={15} />

                <GradientButton
                  text="Envoyer Identité"
                  color={['#7cb9e8', '#7cb9e8']}
                  width={300}
                  handlePress={handleSubmitIdDocs}
                />
              </>
            )}

            <Spacer size={25} />

            <GradientButton
              text="Permis"
              handlePress={() => navigation.navigate('addLicence')}
            />
            {globalState.photoLicence.length > 0 && (
              <>
                <PicsFromB64
                  picsArray={globalState.photoLicence}
                  dispatchGeneralType={`photoLicence`}
                />

                <StyledText>Délivrée le:</StyledText>

                <GradientButton
                  width={300}
                  handlePress={() => setShowLicenseStartPicker(true)}
                  addStyle={{ marginBottom: 5 }}
                  text={moment(licenseStartDate.toJSON()).format('DD MMMM YYYY')} />

                <StyledText>Expire le:</StyledText>

                <GradientButton
                  width={300}
                  handlePress={() => setShowLicenseEndPicker(true)}
                  addStyle={{ marginBottom: 5 }}
                  text={moment(licenseToDate.toJSON()).format('DD MMMM YYYY')} />

                {showStartLicensePicker && (
                  <DateTimePicker
                    value={licenseStartDate}
                    mode="date"
                    onChange={(event, selected) => {
                      setLicenseStartDate(selected)
                      setShowLicenseStartPicker(false)
                    }}
                  />
                )}

                {showEndLicensePicker && (
                  <DateTimePicker
                    value={licenseToDate}
                    mode="date"
                    onChange={(event, selected) => {
                      setLicenseToDate(selected)
                      setShowLicenseEndPicker(false)
                    }}
                  />
                )}

                <GradientButton
                  text="Envoyer Permis"
                  color={['#7cb9e8', '#7cb9e8']}
                  width={300}
                  handlePress={handleSubmitLicence}
                />
              </>
            )}
            <Spacer size={25} />
            {/* <GradientButton
              text="Signature"
              handlePress={() => navigation.navigate('addSignature')}
            />

            {state.signature.length > 0 && (
              <>
                <PicsFromSVG svg={state.signature[0]} dispatch={delSignature} />

                <GradientButton
                  text="Envoyer votre signature"
                  color={['#7cb9e8', '#7cb9e8']}
                  width={300}
                  handlePress={() => {
                    handleSubmitSignature({
                      url: `${API_URL}sendSignature`,
                      body: state.signature[0],
                    });
                  }}
                />
              </>
            )} */}
            {/* 
            {state.signature.length > 0 &&
              state.photoLicence.length > 0 &&
              state.photoID.length > 0 && (
                <>
                  <Spacer size={25} />
                  <GradientButton
                    text="Envoyer Tous les documents"
                    color={['#7cb9e8', '#7cb9e8']}
                    width={300}
                    handlePress={() => {
                      handleSubmitAll({
                        url: `${API_URL}sendAll`,
                        body: {
                          id: state.photoID,
                          licence: state.photoLicence,
                          signature: state.signature[0],
                        },
                      });
                    }}
                  />
                </>
              )} */}
          </BottomBorderContainer>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
