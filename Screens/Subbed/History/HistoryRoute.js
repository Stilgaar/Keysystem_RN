import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {generalStyles, greyish} from '../../../Shared/css';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {blue} from '../../../Shared/css';

export default function HistoryRoute({item}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[generalStyles.globalShadow, {paddingVertical: 10}]}>
      <TopBorderContainer>
        {(item.departureTime || item.departureLocation) && (
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="flag" size={12} color="green" />

            <StyledText style={{marginLeft: 5}}>
              {item?.departureTime}{' '}
            </StyledText>
            <StyledText style={{marginLeft: 5}}>
              {item?.departureLocation}
            </StyledText>
          </View>
        )}

        {(item.arrivalTime || item.arrivalLocation) && (
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="flag" size={12} color="red" />

            <StyledText style={{marginLeft: 5}}>{item?.arrivalTime}</StyledText>
            <StyledText style={{marginLeft: 5}}>
              {item?.arrivalLocation}
            </StyledText>
          </View>
        )}
      </TopBorderContainer>

      <BottomBorderContainer style={[{paddingHorizontal: 0}]}>
        <ScrollView horizontal>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={1}
              style={[{paddingVertical: 20, paddingLeft: 5}]}>
              <TopBorderContainer>
                <StyledText>Km parcourus</StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText style={styles.itemText}>
                  {item.routeKmDone}
                </StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[{paddingVertical: 20}]}>
              <TopBorderContainer>
                <StyledText>Heure de conduite</StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText style={styles.itemText}>
                  {item.routeDuration}
                </StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[{paddingVertical: 20}]}>
              <TopBorderContainer>
                <StyledText>Heure d'arrêt</StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText style={styles.itemText}>
                  {item.routeStops}
                </StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[{paddingVertical: 20}]}>
              <TopBorderContainer>
                <StyledText>Consommation (L/100)</StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText style={styles.itemText}>
                  {item.routeGasConsumtion}
                </StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[{paddingVertical: 20}]}>
              <TopBorderContainer>
                <StyledText>Vitesse moyenne (km/h)</StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText style={styles.itemText}>
                  {item.routeAverageSpeed}
                </StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[{paddingVertical: 20, paddingRight: 5}]}>
              <TopBorderContainer>
                <StyledText>Rejet en CO2 (g/mol)</StyledText>
              </TopBorderContainer>
              <BottomBorderContainer>
                <StyledText style={styles.itemText}>{item.routeC02}</StyledText>
              </BottomBorderContainer>
            </TouchableOpacity>
            {/* <View style={styles.cell}>
              <StyledText style={styles.itemSmalltext}>Km</StyledText>
              <StyledText style={styles.itemText}>
                {item.routeKmDone}
              </StyledText>
              <StyledText>Parcourus</StyledText>
            </View> */}
            {/* 
            <View style={styles.cell}>
              <StyledText style={styles.itemSmalltext}>h</StyledText>
              <StyledText style={styles.itemText}>
                {item.routeDuration}
              </StyledText>
              <StyledText>de conduite</StyledText>
            </View>

            <View style={styles.cell}>
              <StyledText style={styles.itemSmalltext}>h</StyledText>
              <StyledText style={styles.itemText}>{item.routeStops}</StyledText>
              <StyledText>d'arrêt</StyledText>
            </View>

            <View style={styles.cell}>
              <StyledText style={styles.itemSmalltext}>l/100</StyledText>
              <StyledText style={styles.itemText}>
                {item.routeGasConsumtion}
              </StyledText>
              <StyledText>consomation</StyledText>
            </View>

            <View style={styles.cell}>
              <StyledText style={styles.itemSmalltext}>km/h</StyledText>
              <StyledText style={styles.itemText}>
                {item.routeAverageSpeed}
              </StyledText>
              <StyledText>vitesse moyenne</StyledText>
            </View>

            <View style={styles.cell}>
              <StyledText style={styles.itemSmalltext}>g/mol</StyledText>
              <StyledText style={styles.itemText}>{item.routeC02}</StyledText>
              <StyledText>Rejet en CO2</StyledText>
            </View> */}
          </View>
        </ScrollView>
      </BottomBorderContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  itemText: {
    color: blue,
    fontSize: 50,
    textAlign: 'center',
  },
  itemSmalltext: {
    position: 'absolute',
    top: 0,
    right: 1,
    fontSize: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 7,
  },
});
