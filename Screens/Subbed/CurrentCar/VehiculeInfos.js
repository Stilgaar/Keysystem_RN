import {Image, View} from 'react-native';
import {generalStyles, greyish} from '../../../Shared/css';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {GradientButton} from '../../../comps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';

function VehiculesInfo({vehicule, navigation, style, bgcolor = greyish, type}) {

  let base64VehiclePicture = `data:${vehicule?.vehicleSRCMimeType};base64,${vehicule?.vehicleSRC}`
  return (
    <>
      <TopBorderContainer>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{marginRight: 10}}>
                  <FontAwesome5
                    name={'key'}
                    size={25}
                    color={'black'}
                  />
                </View>

                {/* <View>
                  <StyledText>{vehicule?.vehiculeContractType}</StyledText>
                  <StyledText>{vehicule?.vehiculeContractRenter}</StyledText>
                </View> */}
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {vehicule?.vehicleSRC ? (
                  <Image
                  source={{uri: `${base64VehiclePicture}`}}
                  style={{width: 100, height: 100, borderRadius: 50, margin: 10}}
                />
              ) : (
                <MaterialCommunityIcons
                  name={'car'}
                  size={50}
                  color={'black'}
                />
              )}
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {vehicule &&
                (vehicule?.vehicleEngineType === 'full-eletric' ||
                  vehicule?.vehicleEngineType === 'plugin-hybrid') && (
                  <MaterialCommunityIcons
                    name={'car-electric'}
                    size={30}
                    color={'black'}
                  />
                )}

              {vehicule &&
                (vehicule?.vehicleEngineType === 'Gasoline' || 
                  vehicule?.vehicleEngineType === 'Diesel' ||
                  vehicule?.vehicleEngineType === 'plugin-hybrid') && (
                  <MaterialCommunityIcons
                    name={'gas-station'}
                    size={30}
                    color={'black'}
                  />
                )}
            </View>
          </View>
        </View>
      </TopBorderContainer>

      <BottomBorderContainer
        style={[generalStyles.center, {flexDirection: 'row', marginBottom: 5}]}>
        {type !== 'fromSelectCar' && (
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <GradientButton
              width={60}
              borderRadius={50}
              buttonPadding={8}
              disabled={vehicule?.vehicleLocation === null}
              handlePress={() => navigation.navigate('CarMap')}>
              <MaterialCommunityIcons
                name={'target'}
                size={25}
                color={'white'}
              />
            </GradientButton>
          </View>
        )}

        <View
          style={{
            flex: 1,
            justifyContent:
              type !== 'fromSelectCar' ? 'center' : 'space-between',
            alignItems: 'center',
            flexDirection: type !== 'fromSelectCar' ? 'column' : 'row',
          }}>
          <StyledText style={{fontSize: 20, textAlign: 'center'}}>
            {vehicule?.vehicleBrand} - {vehicule?.vehicleModel}
          </StyledText>

          <StyledText style={{textAlign: 'center'}}>
            {vehicule?.vehicleImmatriculation}
          </StyledText>
        </View>

        {type !== 'fromSelectCar' && (
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <GradientButton
              width={60}
              borderRadius={50}
              buttonPadding={8}
              disabled={vehicule?.vehicleDocuments === null || vehicule?.vehicleDocuments?.length <= 0}
              handlePress={() => navigation.navigate('VirtualPouch')}>
              <MaterialCommunityIcons
                name={'file-document-multiple'}
                size={25}
                color={'white'}
              />
            </GradientButton>
          </View>
        )}
      </BottomBorderContainer>
    </>
  );
}

export default VehiculesInfo;
