// React && React Native components

import {Dimensions, ScrollView, Text, View} from 'react-native';
import {generalStyles, greyish, primaryColor2} from '../../../Shared/css';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import {GradientButton} from '../../../comps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import Spacer from '../../../Shared/Spacer';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logoutDispatch} from '../../../Reducer/GlobalReducer/globalDispatch';
import useGlobalContext from '../../../Hooks/useGlobalContext';
import moment from 'moment';
import { KaaS } from '../../../ContinentalUtilities/KaasMethods';

// TODO: Récup les documents du serveur + refresh après ajout + ajout de tous les docs en même temps + signature ajoutée comme un document, sinon ajout de la signature à l'ajout de l'inventory ça evite les fraudres

// Array to render texts with <TextInfo />

// Mon compte
// Infos

export default function MyAccount({navigation}) {
  // Ca c'est ici pour le moment mais après tout le user sera fetch, de toutes manières, au moment du login et
  // sera passé dans le globalcontext/usereducer.

  const {userDispatch, userState} = useGlobalContext();
  const windowWidth = Dimensions.get('window').width;

  let base64UserPicture = `data:${userState?.user?.[0].src};base64,${userState?.user?.[0].src}`

  const handleLogout = async () => {
    await KaaS.closeSession();
    userDispatch(logoutDispatch())
  }

  return (
    <View style={[generalStyles.container]}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, width: '100%', marginTop: 10}}>
        <TopBorderContainer style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            {userState?.user?.[0].src ? (
              <Image
                source={{uri: `${base64UserPicture}`}}
                style={{width: 70, height: 70, borderRadius: 50}}
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
            <StyledText>{userState?.user?.[0].userAddress}</StyledText>
            <StyledText>
              {userState?.user?.[0].userPostalCode}{' '}
              {userState?.user?.[0].userCity}{' '}
              {userState?.user?.[0].userCountry}
            </StyledText>
            <StyledText>{userState?.user?.[0].userEmailAddress}</StyledText>
          </View>
        </TopBorderContainer>

        <BottomBorderContainer>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StyledText style={{fontSize: 20, textAlign: 'center'}}>
              {userState?.user?.[0].userFullName}
            </StyledText>

            <StyledText style={{textAlign: 'center'}}>
              {moment(userState?.user?.[0].userBirthDate).format('DD MMMM YYYY')}
            </StyledText>
          </View>
        </BottomBorderContainer>

        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
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
