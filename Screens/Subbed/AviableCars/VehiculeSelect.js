import { generalStyles, greyish, primaryColor2 } from '../../../Shared/css';

import { Avatar } from 'react-native-elements';
import StyledText from '../../../Shared/StyledText';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VehiculeSelect({ vehicle, selectedVehicule }) {
  
  const selected = selectedVehicule.vehicleGuid === vehicle.vehicleGuid;
  let base64VehiclePicture = `data:${vehicle.vehicleSRCMimeType};base64,${vehicle.vehicleSRC}`

  return (

    <View style={{ flexDirection: 'row', borderRadius: 15 }}>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          jutifyContent: 'center',
          flex: 2,
          backgroundColor: selected ? '#5b8cde' : 'white',
          padding: 5,
        }}>

        <View style={[generalStyles.center, generalStyles.globalShadow]}>

          {vehicle?.vehicleSRC ? (

            <Avatar size={50} rounded source={{ uri: `${base64VehiclePicture}` }} />

          ) : (
            <MaterialCommunityIcons
              name={'car'}
              size={50}
              color={'black'}
            />
          )}

        </View>


        <View style={{ marginLeft: 10 }}>

          <StyledText style={{ color: selected ? 'white' : 'black' }}>

            {vehicle.vehicleBrand} - {vehicle.vehicleModel}

          </StyledText>

          <StyledText style={{ color: selected ? 'white' : 'black' }}>

            {vehicle.vehicleImmatriculation}

          </StyledText>

        </View>

      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: greyish,
          justifyContent: 'flex-end',
          padding: 5,
          flexDirection: 'row',
          alignContent: 'flex-end',
        }}>

        {vehicle.vehicleIsUsed ? (

          <StyledText>Utilisée</StyledText>

        ) : (

          <StyledText>Libre</StyledText>

        )}

      </View>
    </View>
  );
}
