import {ScrollView, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import {GradientButton} from '../../../comps';
import PicsFromB64 from '../../../Shared/PicsFromB64';
import PicsFromSVG from '../../../Shared/PicsFromSVG';
import React, {useState} from 'react';
import Spacer from '../../../Shared/Spacer';
import {StateContext} from '../../../Context/StateContext';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {activateAccountList} from '../../../JSON/Fr/MyAccountArray';
import {delSignature} from '../../../Reducer/GlobalReducer/globalDispatch';
import {generalStyles} from '../../../Shared/css';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment

from 'moment';
// Activer mon compte utilisateur
// Upload documents (avec carte d'identité et permis de conduire)
// + Signature électronique
// + Saisie des dates d'expirations

export default function ActivateAccount({navigation}) {
  const {globalState} = React.useContext(StateContext);

  const {userState} = useGlobalContext();

  const [state, setGlobalState] = React.useState(globalState);
  
  const [idStartDate, setIdStartDate] = useState(new Date());
  const [idToDate, setIdToDate] = useState(new Date(idStartDate.getFullYear(), idStartDate.getMonth(), idStartDate.getDate() + 1));
  const [showStartIdPicker, setShowIdStartPicker] = useState(false);
  const [showEndIdPicker, setShowIdEndPicker] = useState(false);

  
  const [licenseStartDate, setLicenseStartDate] = useState(new Date());
  const [licenseToDate, setLicenseToDate] = useState(new Date(licenseStartDate.getFullYear(), licenseStartDate.getMonth(), licenseStartDate.getDate() + 1));
  const [showStartLicensePicker, setShowLicenseStartPicker] = useState(false);
  const [showEndLicensePicker, setShowLicenseEndPicker] = useState(false);

  React.useEffect(() => {
    setTimeout(
      async () => {
        const state = await AsyncStorage.getItem('globalState');
        setGlobalState(JSON.parse(state));
      },

      10,
    );
  }, [globalState]);

  const handleSubmitIdDocs = async () => {
    try {    
        idStartDate.setHours(0,0,0,0)
        idToDate.setHours(0,0,0,0)
        const formData = new FormData()
        formData.append(`fkUserGuid`, userState?.user?.[0].userGuid)
       
        const attributionDocs = []
        if((state.photoID !== undefined || state.photoID !== null))
        {
          state.photoID.forEach(photo => {
            const attributionIdElement = 
            {
              documentFormFile: {uri: photo.jpgFile.uri, type:'image/jpeg', name: photo.jpgFile.name},
              displayName: `Pièce d'identité`,
              fkUserDocumentTypeGuid:`340a5e3e-fe50-11ed-be56-0242ac120002`,
              validFromDate: idStartDate.toJSON(),
              validToDate: idToDate.toJSON(),
              details: ``
            } 
            attributionDocs.push(attributionIdElement)
          });

          if(attributionDocs.length > 0)
          {
            attributionDocs.forEach((doc,index) => {
              // Append the file
              const file = doc.documentFormFile;
              formData.append(`attributionDocs[${index}].DocumentFormFile`, file);

              // Append the display name
              const displayName = doc.displayName || 'DefaultName';
              formData.append(`attributionDocs[${index}].DisplayName`, displayName);

              // Append the document type Guid
              formData.append(`attributionDocs[${index}].FkUserDocumentTypeGuid`, doc.fkUserDocumentTypeGuid);
              
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
    
        console.log("FORM DATA ACTIVATE ACCOUNT ====> ",formData)
    
        let postUserDocument = await fetch(`${process.env.API_URL}/api/UserDocument`, {
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
      licenseStartDate.setHours(0,0,0,0)
      licenseToDate.setHours(0,0,0,0)
      const formData = new FormData()
      formData.append(`fkUserGuid`, userState?.user?.[0].userGuid)
      const attributionDocs = []

      if((state.photoLicence !== undefined || state.photoLicence !== null))
      {
        state.photoLicence.forEach(photo => {
          const attributionLicenceElement = 
          {
            documentFormFile: {uri: photo.jpgFile.uri, type:'image/jpeg', name: photo.jpgFile.name},
            displayName: `Permis de conduire`,
            fkUserDocumentTypeGuid:`0ef95cd2-fe53-11ed-be56-0242ac120002`,
            validFromDate: licenseStartDate.toJSON(),
            validToDate: licenseToDate.toJSON(),
            details: ``
          } 
          attributionDocs.push(attributionLicenceElement)
        });

        if(attributionDocs.length > 0)
        {
          attributionDocs.forEach((doc,index) => {
            // Append the file
            const file = doc.documentFormFile;
            formData.append(`attributionDocs[${index}].DocumentFormFile`, file);

            // Append the display name
            const displayName = doc.displayName || 'DefaultName';
            formData.append(`attributionDocs[${index}].DisplayName`, displayName);

            // Append the document type Guid
            formData.append(`attributionDocs[${index}].FkUserDocumentTypeGuid`, doc.fkUserDocumentTypeGuid);
            
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
  
      console.log("FORM DATA ====> ",formData)
  
      let postUserDocument = await fetch(`${process.env.API_URL}/api/UserDocument`, {
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

  const handleSubmitSignature = async () => {

  }

  const handleSubmitAll = async () => {

  }

  return (
    <View style={[generalStyles.container]}>
      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
          <TopBorderContainer>
            <StyledText>Activation de votre compte</StyledText>
          </TopBorderContainer>
          <BottomBorderContainer>
            <StyledText style={{marginBottom: 5}}>
              Pour activer votre compte nous avons besoin des documents suivants
              :
            </StyledText>

            {activateAccountList.map(list => (
              <StyledText style={{marginLeft: 15, marginTop: 2}} key={list}>
                * {list}
              </StyledText>
            ))}
          </BottomBorderContainer>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
          <TopBorderContainer>
            <StyledText>Ajouter un document</StyledText>
          </TopBorderContainer>
          <BottomBorderContainer>
            <GradientButton
              text="Piece d'identité"
              handlePress={() => navigation.navigate('addId')}
            />

            {state.photoID.length > 0 && (
              <>
                <PicsFromB64
                  picsArray={state.photoID}
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
            {state.photoLicence.length > 0 && (
              <>
                <PicsFromB64
                  picsArray={state.photoLicence}
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
                      url: `${process.env.API_URL}sendSignature`,
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
                        url: `${process.env.API_URL}sendAll`,
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
