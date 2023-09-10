import { Dimensions, Text, View } from 'react-native';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import { greyish } from '../../../Shared/css';
import { vehiculeKmArray } from '../../../JSON/Fr/CurrentVehiculeArray';

// Historique des relevés kilométriques
// Nombre de km effectués depuis l'obtention du véhicule
// Nombre de KM par jour / par mois

export default function HistoryKM({ data, style }) {
  const { width } = Dimensions.get('window');
  const itemWidth = width / vehiculeKmArray.length;

  return (

    <>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {vehiculeKmArray.map(info => (
          <View key={info.key} style={{ width: itemWidth }}>
            <TopBorderContainer
              style={[
                style,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <StyledText style={{ fontSize: 13 }}>{info.text}</StyledText>
            </TopBorderContainer>

            <BottomBorderContainer
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <StyledText style={{ fontSize: 15 }}>
                {data?.[`${info.key}`]}
              </StyledText>
            </BottomBorderContainer>
          </View>
        ))}
      </View>
    </>
  );
}
