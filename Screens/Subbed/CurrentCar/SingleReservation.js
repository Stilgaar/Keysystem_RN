import {Text, TouchableOpacity, View, Image} from 'react-native';
import {generalStyles, primaryColor2} from '../../../Shared/css';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import Octicons from 'react-native-vector-icons/Octicons';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/moment';
import { useEffect } from 'react';

export default function SingleReservation({reservationVehicle, virtualKey, navigation}) {
    let base64VehiclePicture = `data:${reservationVehicle.vehicleSRCMimeType};base64,${reservationVehicle.vehicleSRC}`
    let disabled = reservationVehicle.reservationToDate < new Date().toJSON() || reservationVehicle.reservationStatus === null || reservationVehicle.reservationStatus === false;
  return (
    <TouchableOpacity
      key={reservationVehicle.reservationGuid}
      disabled={disabled}
      style={[generalStyles.globalShadow, {margin: 3}, disabled ? {opacity: 0.8} : {}]}
      onPress={() => {
        navigation.navigate('SelectedVehicule', {
            vehicle: reservationVehicle,
            virtualKey: virtualKey,
            reservationTo: reservationVehicle.reservationToDate
        });
      }}>
    <TopBorderContainer 
        style={[{flexDirection: 'row', flex: 1, justifyContent:'space-between'}, disabled ? {opacity: 0.5} : {}]}>
        <View>            
            {reservationVehicle?.vehicleSRC ? (
                <Image
                  source={{uri: `${base64VehiclePicture}`}}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              ) : (
                <MaterialCommunityIcons
                  name={'car'}
                  size={50}
                  color={'black'}
                />
              )}
        </View>

        <View>
          <StyledText
            style={{
              textAlign: 'left',
              color: 'black',
              fontSize: 30,
            }}>
            {reservationVehicle.vehicleBrand} {reservationVehicle.vehicleModel}
          </StyledText>
        </View>
        <View>
            <StyledText
            style={{
              textAlign: 'right',
              color: 'black',
              fontSize: 15,
            }}>
            {reservationVehicle.vehicleImmatriculation}
          </StyledText>
        </View>
        <View>
        { reservationVehicle?.reservationStatus !== null ? (
                 reservationVehicle.reservationStatus ? (
                    <Octicons name="check-circle" size={30} color="#94ecd3" />
                ) : (
                    <Octicons name="x-circle" size={30} color="#dc182c" />
                )) : (
                    <Octicons name="no-entry" size={30} color="#e18335" />  
              )}
        </View>
      </TopBorderContainer>

      <BottomBorderContainer
      style={[disabled ? {opacity: 0.5} : {}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <StyledText style={{fontSize: 12}}>
            DU : {moment(reservationVehicle.reservationFromDate).format('DD/MM/YYYY')} {"\n"}
            A: {moment(reservationVehicle.reservationFromDate).format('HH:MM')}
          </StyledText>

          <StyledText style={{fontSize: 12}}>
            AU: {moment(reservationVehicle.reservationToDate).format('DD/MM/YYYY')} {"\n"}
            A: {moment(reservationVehicle.reservationToDate).format('HH:MM')}
          </StyledText>
        </View>
      </BottomBorderContainer>
    </TouchableOpacity>
  );
}
