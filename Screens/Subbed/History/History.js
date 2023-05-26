import {Dimensions, ScrollView, Text, View} from 'react-native';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import {GradientButton} from '../../../comps';
import React from 'react';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {generalStyles} from '../../../Shared/css';

// Voir mes précédents emprunts
// clés / périodes
// Etats des lieux
// trajets

export default function History({navigation}) {
  const windowWidth = Dimensions.get('window').width;

  // This name va filer l'array de dans userHistory qu'on va dispatcher dans les accordéons dans un stackScreen
  // la string pour le momment "userOldKeys sera remplace dans la navigation <APPNAVIGATOR /> et passé en prop
  // récupéré dans la route.params.

  return (
    <View style={[generalStyles.container]}>
      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
          <TopBorderContainer>
            <StyledText>Liste des historiques</StyledText>
          </TopBorderContainer>
          <BottomBorderContainer>
            <GradientButton
              handlePress={() => navigation.navigate('HistoryRoutes')}
              addStyle={{marginTop: 15, marginBottom: 15}}
              text={`Précédents Trajets`}
            />

            <GradientButton
              handlePress={() => navigation.navigate('HistoryKeys')}
              addStyle={{marginBottom: 15}}
              text={`Précédentes clés`}
            />

            <GradientButton
              handlePress={() => navigation.navigate('HistoryNexReservation')}
              addStyle={{marginBottom: 15}}
              text={`Futures Locations`}
            />
          </BottomBorderContainer>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
