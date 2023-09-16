import { Dimensions, StyleSheet, View } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { PERMISSIONS, request } from 'react-native-permissions';

import AccordeonSingleItem from '../Screens/Subbed/History/AccordeonSingleItem';
import Actions from '../Screens/Subbed/CurrentCar/Actions';
import ActivateAccount from '../Screens/Subbed/PersonalSpace/ActivateAccount';
import AddPicture from '../Shared/AddPicture';
import AddSignature from '../Screens/Subbed/PersonalSpace/AddSignature';
import CarLocation from '../Screens/Subbed/CurrentCar/CarLocation';
import Costs from '../Screens/Subbed/CurrentCar/Costs';
import { CustomTabBarButton } from '../comps';
import Damage from '../Screens/Subbed/CurrentCar/Damage';
import HeaderSubbed from '../Shared/Headers/HeaderSubbed';
import HeadersPics from '../Shared/Headers/HeadersPics';
import History from '../Screens/Subbed/History/History';
import Inventory from '../Screens/Subbed/CurrentCar/Inventory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MakeReservation from '../Screens/Subbed/AviableCars/MakeReservation';
import ModifyAccount from '../Screens/Subbed/PersonalSpace/ModifyAccount';
import MyAccount from '../Screens/Subbed/PersonalSpace/MyAccount';
import { Notifications } from 'react-native-notifications';
import Notifs from '../Screens/Subbed/Notifcations/Notifs';
import ReservationList from '../Screens/Subbed/CurrentCar/ReservationList';
import { PermissionsAndroid } from 'react-native';
import React from 'react';
import SelectVehicle from '../Screens/Subbed/AviableCars/SelectVehicule';
import SelectedVehicule from '../Screens/Subbed/CurrentCar/SelectedVehicule';
import { StateContext } from '../Context/StateContext';
import VehiculeCalendar from '../Screens/Subbed/AviableCars/VehiculeCalendar';
import VirtualPouch from '../Screens/Subbed/CurrentCar/VirtualPouch';
import { addNotification } from '../Reducer/GlobalReducer/globalDispatch';
import { blackA } from '../Shared/css';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { damageArray } from '../JSON/Fr/DamageArray';
import { inventoryArray } from '../JSON/Fr/InventoryArray';
import useGlobalContext from '../Hooks/useGlobalContext';

////////////////
// Needed to create any navigation en React Native
////////////////

////////////////
// Navigations ways
////////////////

////////////////
// Different Headers DUH
////////////////

////////////////
// Account Stack
////////////////

////////////////
// Assigned Vehicule Stack
////////////////

////////////////
// Notification Stack
////////////////

////////////////
// Select Vehicule Stack
////////////////

////////////////
// Array for making the routes for the pictures in Damage and for the Inventories
////////////////

////////////////
// Misc Imports
////////////////

// Thats the bottom navigation
const Tab = createBottomTabNavigator();
// These are the only on that can be given a header
const Stack = createStackNavigator();

// Tab icons

const wheight = Dimensions.get('screen').height;
// Principal Navigation
export default function AppNavigator() {
  const { userDispatch } = useGlobalContext();

  const [notificationPermission, setNotificationPermission] =
    React.useState(null);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      return request(PERMISSIONS.IOS.NOTIFICATIONS);
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
        title: 'Key System Post Notification Permission',
        message: 'Key System needs your permission to send you notifications',
        buttonPositive: 'Accept',
        buttonNegative: 'Cancel'
      }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setNotificationPermission('granted');
        return 'granted';
      } else {
        setNotificationPermission('denied');
        return 'denied';
      }
    }
  };

  React.useEffect(() => {
    const getNotif = async () => {
      const status = await requestNotificationPermission();

      if (status !== 'granted') {
        // Handle the case when notification permission is denied
        // For example, you can show an error message or a prompt to request permission again
        console.log('Notification permission denied');
        return;
      } else {
        // Handle the case when notification permission is granted
        // For example, you can initialize your notification handling logic here
        console.log('Notification permission granted');
      }
    };

    getNotif();

    const ws = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');

    ws.addEventListener('message', event => {
      if (event.data.length > 0) {
        if (event.data.includes('title') && event.data.includes('body')) {
          makeANofitication(JSON.parse(event.data));
        }
      }
    });
  }, []);

  function makeANofitication(notif) {
    userDispatch(addNotification(notif));

    Notifications.postLocalNotification({
      title: notif.title,
      body: notif.body,
    });
  }

  ////////////////
  // Add Screen Names in this array where you don't want the bottom* bar to be displayed. \o/
  ////////////////

  const tabBarDisplayExclusionList = [
    'addId',
    'addLicence',
    'addSignature',
    'addDamage',
    'inventoryGeneralFrontPanel',
    'inventoryLeftFrontWheel',
    'inventoryFrontLeft',
    'inventoryBackLeft',
    'inventoryLeftBackWheel',
    'inventoryGeneralBackPanel',
    'inventoryRightBackWheel',
    'inventoryBackRight',
    'inventoryFrontRight',
    'inventoryRightFrontWheel',
    'inventoryAdditionalPhotos',
    'damageGeneralFrontPanel',
    'damageLeftFrontWheel',
    'damageFrontLeft',
    'damageBackLeft',
    'damageLeftBackWheel',
    'damageGeneralBackPanel',
    'damageRightBackWheel',
    'damageBackRight',
    'damageFrontRight',
    'damageRightFrontWheel',
    'damageAdditionalPhotos',
    'attributionCost',
  ];

  ////////////////
  // Account Stack
  ////////////////

  const StackAccount = ({ route }) => {

    return (
      <Stack.Navigator initialRouteName="MyAccount">
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Mon Compte'}
                navigation={navigation}
                route={route}
                initial={true}
              />
            ),
          }}
        />

        <Stack.Screen
          name="ModifyAccount"
          component={ModifyAccount}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Modification information'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="ActivateAccount"
          component={ActivateAccount}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Ajout de documents'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="addId"
          component={AddPicture}
          initialParams={{
            textForObtention: `Afin de valider votre compte, votre employeur à besoin de votre pièce d'identité`,
            dispatchGeneralType: `photoID`,
            maxPics: 2,
          }}
          options={{
            header: ({ navigation }) => (
              <HeadersPics
                title={"Photo d'identité : recto verso"}
                numberLenghtChecker={`photoID`}
                nombreMax={'Maximum 2'}
                navigation={navigation}
              />
            ),
          }}
        />

        <Stack.Screen
          name="addLicence"
          component={AddPicture}
          initialParams={{
            textForObtention: `Afin de valider votre compte, votre employeur à besoin de votre permis de conduire`,
            dispatchGeneralType: `photoLicence`,
            maxPics: 2,
          }}
          options={{
            header: ({ navigation }) => (
              <HeadersPics
                title={'Permis de conduire : recto verso'}
                numberLenghtChecker={`photoLicence`}
                nombreMax={' 2'}
                navigation={navigation}
              />
            ),
          }}
        />

        {/*
                ////////////////
                // ADD SIGNATURE
                ////////////////
                  */}

        <Stack.Screen name="addSignature" component={AddSignature} />

        {/*
                ////////////////
                // HISTORY (Reservations && Routes && Futur Reservations)
                ////////////////
                  */}

        <Stack.Screen
          name="History"
          component={History}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Historique'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="HistoryRoutes"
          component={AccordeonSingleItem}
          initialParams={{
            mapType: 'userRoutes',
            title: 'Trajet',
          }}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Précédents Trajets'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="HistoryKeys"
          component={AccordeonSingleItem}
          initialParams={{
            mapType: 'userOldKeys',
            title: 'Clef',
          }}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Clefs Numériques Obsolètes'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="HistoryNexReservation"
          component={AccordeonSingleItem}
          initialParams={{
            mapType: 'userNexReservations',
            title: 'Reservation',
          }}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Prochaines réservations'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  };

  ////////////////
  // Car Stack
  ////////////////

  const StackCars = ({ route }) => {
    const { globalState } = React.useContext(StateContext);

    const [state, setGlobalState] = React.useState(globalState);

    return (
      <Stack.Navigator initialRouteName="ReservationList">
        <Stack.Screen
          name="ReservationList"
          component={ReservationList}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={
                  state?.currentKeys?.length > 1
                    ? 'Réservations'
                    : 'Réservation'
                }
                navigation={navigation}
                route={route}
                initial={true}
              />
            ),
          }}
        />

        <Stack.Screen
          name="SelectedVehicule"
          component={SelectedVehicule}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Véhicule sélectionné'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Actions"
          component={Actions}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Actions voiture'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="ReservationLists"
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Clefs Numériques'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
          component={ReservationList}
        />

        <Stack.Screen
          name="Costs"
          initialParams={{
            dispatchGeneralType: 'attributionCost',
          }}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Coûts véhicules'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
          component={Costs}
        />

        <Stack.Screen
          name="attributionCost"
          component={AddPicture}
          initialParams={{
            textForObtention: 'Documents cout',
            dispatchGeneralType: 'attributionCost',
            dispatchType: 'attributionDocs',
            maxPics: 5,
          }}
          options={{
            header: ({ navigation }) => (
              <HeadersPics
                title={'Documents - cout'}
                info={'attributionDocs'}
                numberLenghtChecker={'attributionCost'}
                nombreMax={' 5'}
                navigation={navigation}
              />
            ),
          }}
        />

        {/* <Stack.Screen
          name="Damage"
          initialParams={{
            dispatchGeneralType: 'attributionDamage',
          }}
          options={{
            header: ({navigation}) => (
              <HeaderSubbed
                title={'Déclaration Sinistre'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
          component={Damage}
        />

        {damageArray.map(stack => (
          <Stack.Screen
            key={stack.key}
            name={stack.key}
            component={AddPicture}
            initialParams={{
              textForObtention: stack.text,
              dispatchGeneralType: 'attributionDamage',
              dispatchType: stack.key,
              maxPics: 3,
            }}
            options={{
              header: ({navigation}) => (
                <HeadersPics
                  title={stack.text}
                  info={stack.key}
                  numberLenghtChecker={'attributionDamage'}
                  nombreMax={'Maximum 3'}
                  navigation={navigation}
                />
              ),
            }}
          />
        ))} */}

        <Stack.Screen
          name="Damage"
          component={Damage}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Déclaration Sinistre'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />

        <Stack.Screen
          name="addDamage"
          component={AddPicture}
          initialParams={{
            textForObtention: `Ajout de photo(s) du sinistre`,
            dispatchGeneralType: `photoDamage`,
            maxPics: 5,
          }}
          options={{
            header: ({ navigation }) => (
              <HeadersPics
                title={"Photo du sinistre"}
                numberLenghtChecker={`photoDamage`}
                nombreMax={'Maximum 6'}
                navigation={navigation}
              />
            ),
          }}
        />

        <Stack.Screen
          name="CheckIn"
          initialParams={{
            dispatchGeneralType: 'attributionInventory',
            type: 'CheckIn',
          }}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={"Réalisation d'un état des lieux"}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
          component={Inventory}
        />

        <Stack.Screen
          name="CheckOut"
          initialParams={{
            dispatchGeneralType: 'attributionInventory',
            type: 'CheckOut',
          }}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={"Réalisation d'un état des lieux"}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
          component={Inventory}
        />

        {inventoryArray.map((stack, index) => (
          <Stack.Screen
            key={stack.key}
            name={stack.key}
            component={AddPicture}
            initialParams={{
              textForObtention: stack.text,
              dispatchGeneralType: 'attributionInventory',
              dispatchType: stack.key,
              maxPics: 3,
              indexInventory: index,
            }}
            options={{
              header: ({ navigation }) => (
                <HeadersPics
                  title={stack.text}
                  info={stack.key}
                  numberLenghtChecker={'attributionInventory'}
                  nombreMax={'Maximum 3'}
                  navigation={navigation}
                />
              ),
            }}
          />
        ))}

        <Stack.Screen
          name="CarMap"
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Emplacement voiture'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
          component={CarLocation}
        />

        <Stack.Screen
          name="VirtualPouch"
          component={VirtualPouch}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Documents Pochette Virtuelle'}
                navigation={navigation}
                route={route}
                initial={false}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  };

  ////////////////
  // Notification Stack (for here for now)
  ////////////////

  const StackNotification = ({ route }) => {
    return (
      <Stack.Navigator initialRouteName="Notifs">
        <Stack.Screen
          name="Notifs"
          component={Notifs}
          options={{
            header: ({ navigation }) => (
              <HeaderSubbed
                title={'Notifications'}
                navigation={navigation}
                route={route}
                initial={true}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  };

  ////////////////
  // Selected Vehicule Stack
  ////////////////

  const StackSelectedVehicule = ({ route }) => {
    return (

      <>

        <Stack.Navigator initialRouteName="Select">
          <Stack.Screen
            name="Select"
            component={SelectVehicle}
            options={{
              header: ({ navigation }) => (
                <HeaderSubbed
                  title={`Véhicules disponibles`}
                  navigation={navigation}
                  route={route}
                  initial={true}
                />
              ),
            }}
          />

          <Stack.Screen
            name="VehiculeCalendar"
            component={VehiculeCalendar}
            options={{
              header: ({ navigation }) => (
                <HeaderSubbed
                  title={'Calendrier des disponibilités'}
                  navigation={navigation}
                  route={route}
                  initial={false}
                />
              ),
            }}
          />

          <Stack.Screen
            name="MakeReservation"
            component={MakeReservation}
            options={{
              header: ({ navigation }) => (
                <HeaderSubbed
                  title={'Réservez'}
                  navigation={navigation}
                  route={route}
                  initial={false}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </>
    );
  };

  ////////////////
  // The main tab navigator stack
  ////////////////

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: blackA,
          tabBarHideOnKeyboard: true,
          tabBarStyle: !tabBarDisplayExclusionList.includes(
            getFocusedRouteNameFromRoute(route),
          )
            ? styles.tabBarStyles
            : { display: 'none' },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Account') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } else if (route.name === 'Car') {
              iconName = focused ? 'car-sport' : 'car-sport-outline';
            } else if (route.name === 'Vehicules') {
              iconName = focused ? 'cart-sharp' : 'cart-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            return (
              <>
                {
                  (iconName = focused ? (
                    <CustomTabBarButton>
                      <Ionicons name={iconName} size={40} color={color} />
                    </CustomTabBarButton>
                  ) : (
                    <Ionicons name={iconName} size={25} color={color} />
                  ))
                }
              </>
            );
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        })}>
        {/* Current Car */}

        <Tab.Screen name="Car" component={StackCars} />

        {/* Aviable Cars*/}
        <Tab.Screen name="Vehicules" component={StackSelectedVehicule} />

        {/* Notifications*/}
        <Tab.Screen name="Notification" component={StackNotification} />

        {/* Account Settings*/}
        <Tab.Screen name="Account" component={StackAccount} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyles: {
    backgroundColor: blackA,
    height: wheight / 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
