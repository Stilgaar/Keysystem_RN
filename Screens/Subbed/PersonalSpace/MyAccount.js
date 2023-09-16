// React && React Native components
import React from 'react';
import { Dimensions, ScrollView, Text, View, TouchableOpacity } from 'react-native';

// General Styles
import { generalStyles } from '../../../Shared/css';

// State management
import { DispatchContext } from '../../../Context/StateContext';
import useGlobalContext from '../../../Hooks/useGlobalContext';
// state function managements
import { logoutDispatch, resetInitialStateLogout } from '../../../Reducer/GlobalReducer/globalDispatch';

// Containers
import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import TopBorderContainer from '../../../Shared/TopBorderContainer';

// Buttons
import { GradientButton } from '../../../comps';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Simple components
import Spacer from '../../../Shared/Spacer';
import StyledText from '../../../Shared/StyledText';
import moment from 'moment';

// kaas
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';

// TODO: Récup les documents du serveur + refresh après ajout + ajout de tous les docs en même temps + signature ajoutée comme un document, sinon ajout de la signature à l'ajout de l'inventory ça evite les fraudres

// Array to render texts with <TextInfo />

// Mon compte
// Infos

export default function MyAccount({ navigation }) {
  // Ca c'est ici pour le moment mais après tout le user sera fetch, de toutes manières, au moment du login et
  // sera passé dans le globalcontext/usereducer.

  const { userDispatch, userState } = useGlobalContext();
  const { globalDispatch } = React.useContext(DispatchContext)

  const windowWidth = Dimensions.get('window').width;

  let base64UserPicture = `data:${userState?.user?.src
    }; base64, ${userState?.user?.src} `

  const handleLogout = async () => {
    globalDispatch(resetInitialStateLogout())
    userDispatch(logoutDispatch())
    await KaaS.closeSession();
  }

  return (
    <View style={[generalStyles.container]}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, width: '100%', marginTop: 10 }}>

        <TopBorderContainer style={{ flexDirection: 'row' }}>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            {userState?.user?.src ? (
              <Image
                source={{ uri: `${base64UserPicture} ` }}
                style={{ width: 70, height: 70, borderRadius: 50 }}
              />
            ) : (
              <MaterialIcons name={'person'} size={50} color={'black'} />
            )}
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <StyledText>{userState?.user?.userAddress}</StyledText>
            <StyledText>
              {userState?.user?.userPostalCode}{' '}
              {userState?.user?.userCity}{' '}
              {userState?.user?.userCountry}
            </StyledText>
            <StyledText>{userState?.user?.userEmailAddress}</StyledText>
          </View>
        </TopBorderContainer>

        <BottomBorderContainer>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StyledText style={{ fontSize: 20, textAlign: 'center' }}>
              {userState?.user?.userFullName}
            </StyledText>

            <StyledText style={{ textAlign: 'center' }}>
              {moment(userState?.user?.userBirthDate).format('DD MMMM YYYY')}
            </StyledText>
          </View>
        </BottomBorderContainer>

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, { paddingVertical: 10 }]}>
          <TopBorderContainer>
            <Text style={generalStyles.title}>Modifier votre compte</Text>
          </TopBorderContainer>
          <BottomBorderContainer
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 20,
            }}>
            <Spacer size={1} />
            <GradientButton
              width={windowWidth - 50}
              handlePress={() => navigation.navigate('ModifyAccount')}
              text={`Modifiez vos informations`}
            />
            <GradientButton
              width={windowWidth - 50}
              handlePress={() => navigation.navigate('ActivateAccount')}
              text={`Envoyez vos documents`}
            />

            <GradientButton
              width={windowWidth - 50}
              handlePress={() => navigation.navigate('History')}
              text={`Votre Historique`}
            />

            <GradientButton
              colorStart="#f79253"
              colorEnd="#c42e2e"
              width={windowWidth - 50}
              handlePress={handleLogout}
              text={`Déconnexion`}
            />
            <Spacer size={1} />
          </BottomBorderContainer>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
