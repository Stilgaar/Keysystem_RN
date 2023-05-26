import {Dimensions, Modal, ScrollView, Text, View} from 'react-native';
import {eachDayOfInterval, format} from 'date-fns';

import BottomBorderContainer from '../../../Shared/BottomBorderContainer';
import {Calendar} from 'react-native-calendars';
import {DispatchContext} from '../../../Context/StateContext';
import {GradientButton} from '../../../comps';
import React from 'react';
import Spacer from '../../../Shared/Spacer';
import StyledText from '../../../Shared/StyledText';
import TopBorderContainer from '../../../Shared/TopBorderContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {generalStyles} from '../../../Shared/css';
import {getSelectedVehiculeReseravation} from '../../../Reducer/GlobalReducer/globalDispatch';
import tinycolor from 'tinycolor2';
import vehicules from '../../../JSON/CAR_MOCK_DATA.json';

// Calendrier : listes des véhicules disponibles / jours

export default function VehiculeCalendar({navigation, route}) {
  ////////////////
  // Route  & initialParmas props
  ////////////////

  const {vehiculeGUID} = route.params;

  ////////////////
  // Global Function
  ////////////////

  const {globalDispatch} = React.useContext(DispatchContext);

  ////////////////
  // States for the functions
  ////////////////

  const [vehicule, setVehicule] = React.useState();
  const [selectedDay, setSelectedDay] = React.useState();
  const [period, setPeriod] = React.useState({});

  const windowWidth = Dimensions.get('window').width;

  ////////////////
  // ONLOAD
  ////////////////

  React.useEffect(() => {
    // that will be a fetch soon
    const selectedVehicule = vehicules.filter(
      vechiule => vechiule.vehiculeGUID === vehiculeGUID,
    );

    // stil need to put it there
    setVehicule(...selectedVehicule);
  }, []);

  ////////////////
  // WHEN VEHICULES ARES SET
  ////////////////

  React.useEffect(() => {
    // To generate periods
    const periods = {};
    // To generate colors for each name
    const fullNameColors = {};

    if (vehicule && vehicule.vehiculeReservations) {
      // loops
      vehicule?.vehiculeReservations.forEach(reservation => {
        // for color generations
        const {fullName} = reservation;
        if (!fullNameColors[fullName]) {
          fullNameColors[fullName] = tinycolor
            .random()
            .saturate(25)
            .lighten(10)
            .toString({format: 'hex'});
        }

        // days formatting (for lecture)
        const startDate = new Date(
          reservation.reseravationStart.split('/').reverse().join('-'),
        );
        const endDate = new Date(
          reservation.reservationEnd.split('/').reverse().join('-'),
        );
        const days = eachDayOfInterval({start: startDate, end: endDate});

        // days mapping
        days.forEach(date => {
          // days formatting
          const day = format(date, 'yyyy-MM-dd');

          // Still checks if its empty, so it returns an empty stuff.
          if (!periods[day]) {
            periods[day] = {
              periods: [],
            };
          }

          // get the day (for the array name)
          const period = periods[day];
          // to get the true or false states
          const startingDay = date.getTime() === startDate.getTime();
          // to get the true or false states
          const endingDay = date.getTime() === endDate.getTime();
          // get the right colors
          const color = fullNameColors[reservation.fullName];

          // push'em in array
          period.periods.push({
            startingDay,
            endingDay,
            color: color,
            fullName: fullName,
          });
        });
      });

      // in the useState now !
      setPeriod(periods);
    }
  }, [vehicule]);

  ////////////////
  // JSX
  ////////////////

  return (
    <View style={[generalStyles.container, {paddingVertical: 10}]}>
      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.globalShadow]}>
          <TopBorderContainer>
            <Text style={generalStyles.title}>Disponibilités</Text>
          </TopBorderContainer>
          <BottomBorderContainer>
            {period && (
              <Calendar
                onDayPress={day => setSelectedDay(day)}
                markingType="multi-period"
                markedDates={period}
              />
            )}
          </BottomBorderContainer>
        </TouchableOpacity>

        <Modal visible={!!selectedDay} transparent={true} animation="slide">
          <View style={generalStyles.modalContainer}>
            <View style={generalStyles.modalContent}>
              {period?.[`${selectedDay?.dateString?.toString()}`]?.['periods']
                .length > 0 ? (
                <>
                  <StyledText style={{margin: 10}}>
                    Réservations ce jour {selectedDay.dateString.toString()}
                  </StyledText>

                  {period[`${selectedDay?.dateString?.toString()}`][
                    'periods'
                  ].map((thisDay, index) => (
                    <View
                      key={index}
                      style={[
                        generalStyles.colorContainer,
                        {
                          width: windowWidth - 90,
                          padding: 10,
                          flexDirection: 'row',
                        },
                      ]}>
                      <View
                        style={[
                          generalStyles.badge,
                          {margin: 5, backgroundColor: thisDay.color},
                        ]}
                      />

                      <StyledText style={{margin: 5}}>
                        {' '}
                        Réservé par : {thisDay.fullName}{' '}
                      </StyledText>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  <View style={[generalStyles.colorContainer]}>
                    <StyledText>Pas de réservation ce jour-là</StyledText>
                  </View>
                </>
              )}
              <Spacer size={10} />
              <GradientButton
                handlePress={() => setSelectedDay()}
                text={`ok`}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

      <GradientButton
        text={`Réserver`}
        handlePress={() => {
          globalDispatch(getSelectedVehiculeReseravation(vehicule));
          navigation.navigate('MakeReservation', {vehicule});
        }}
      />
    </View>
  );
}
