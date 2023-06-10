import {Text, TouchableOpacity, View} from 'react-native';
import {generalStyles, primaryColor2} from '../../../Shared/css';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import Octicons from 'react-native-vector-icons/Octicons';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';

export default function SingleKey({vehicule, navigation}) {
  return (
    <TouchableOpacity
      key={vehicule.virtualKeyGuid}
      style={[generalStyles.globalShadow, {margin: 3}]}
      onPress={() => {
        navigation.navigate('SelectedVehicule', {
          virtualKeyGuid: vehicule.virtualKeyGuid,
          vehiculeGuid: vehicule.vehiculeGuid,
        });
      }}>
      <TopBorderContainer style={{flexDirection: 'row'}}>
        <View style={{flex: 0.3}}>
          <Octicons name="key" size={30} color="black" />
        </View>

        <View style={{flex: 2}}>
          <StyledText
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 30,
            }}>
            {vehicule.vehiculeBrand} {vehicule.vehiculeModel}
          </StyledText>
        </View>

        <View style={{flex: 0.3}}>
          <Octicons name="check-circle" size={30} color="white" />
        </View>
      </TopBorderContainer>

      <BottomBorderContainer>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <StyledText style={{fontSize: 18}}>
            Clé : {vehicule.virtualKeyGuid}
          </StyledText>

          <StyledText style={{fontSize: 18}}>
            {vehicule.vehiculeImmatriculation}
          </StyledText>
        </View>
      </BottomBorderContainer>
    </TouchableOpacity>
  );
}
