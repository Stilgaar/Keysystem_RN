import {ScrollView, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import {GradientButton} from '../../../comps';
import PicsFromB64 from '../../../Shared/PicsFromB64';
import PicsFromSVG from '../../../Shared/PicsFromSVG';
import React from 'react';
import Spacer from '../../../Shared/Spacer';
import {StateContext} from '../../../Context/StateContext';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {activateAccountList} from '../../../JSON/Fr/MyAccountArray';
import {delSignature} from '../../../Reducer/GlobalReducer/globalDispatch';
import {generalStyles} from '../../../Shared/css';
import useGlobalContext from '../../../Hooks/useGlobalContext';

// Activer mon compte utilisateur
// Upload documents (avec carte d'identité et permis de conduire)
// + Signature électronique
// + Saisie des dates d'expirations

export default function ActivateAccount({navigation}) {
  const {globalState} = React.useContext(StateContext);

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

  const {handleSubmit: handleSubmitID} = useGlobalContext();
  const {handleSubmit: handleSubmitLicence} = useGlobalContext();
  const {handleSubmit: handleSubmitSignature} = useGlobalContext();
  const {handleSubmit: handleSubmitAll} = useGlobalContext();

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

                <GradientButton
                  text="Envoyer Identité"
                  color={['#7cb9e8', '#7cb9e8']}
                  width={300}
                  handlePress={() => {
                    handleSubmitID({
                      url: `${process.env.API_URL}sendId`,
                      body: state.photoID,
                    });
                  }}
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

                <GradientButton
                  text="Envoyer Permis"
                  color={['#7cb9e8', '#7cb9e8']}
                  width={300}
                  handlePress={() => {
                    handleSubmitLicence({
                      url: `${process.env.API_URL}sendLicence`,
                      body: state.photoLicence,
                    });
                  }}
                />
              </>
            )}
            <Spacer size={25} />
            <GradientButton
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
            )}

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
              )}
          </BottomBorderContainer>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
