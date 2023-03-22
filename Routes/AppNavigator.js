import React from 'react';

////////////////
// Needed to create any navigation en React Native
////////////////

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';

////////////////
// Navigations ways
////////////////

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

////////////////
// Different Headers DUH
////////////////

import HeaderSubbed from "../Shared/Headers/HeaderSubbed"
import HeadersPics from "../Shared/Headers/HeadersPics"

////////////////
// Account Stack
////////////////

import MyAccount from "../Screens/Subbed/PersonalSpace/MyAccount"
import ActivateAccount from "../Screens/Subbed/PersonalSpace/ActivateAccount"
import ModifyAccount from "../Screens/Subbed/PersonalSpace/ModifyAccount"
import AddPicture from '../Shared/AddPicture';
import AddSignature from "../Screens/Subbed/PersonalSpace/AddSignature"
import History from '../Screens/Subbed/History/History';
import AccordeonSingleItem from '../Screens/Subbed/History/AccordeonSingleItem';

////////////////
// Assigned Vehicule Stack
////////////////

import NumericalKey from '../Screens/Subbed/CurrentCar/NumericalKey';
import SelectedVehicule from '../Screens/Subbed/CurrentCar/SelectedVehicule';
import Actions from '../Screens/Subbed/CurrentCar/Actions';
import Damage from '../Screens/Subbed/CurrentCar/Damage';
import Inventory from '../Screens/Subbed/CurrentCar/Inventory';
import Costs from '../Screens/Subbed/CurrentCar/Costs';
import CarLocation from '../Screens/Subbed/CurrentCar/CarLocation';
import VirtualPouch from '../Screens/Subbed/CurrentCar/VirtualPouch';

////////////////
// Notification Stack
////////////////

import Notifs from "../Screens/Subbed/Notifcations/Notifs";

////////////////
// Select Vehicule Stack
////////////////

import MakeReservation from '../Screens/Subbed/AviableCars/MakeReservation';
import SelectVehicle from '../Screens/Subbed/AviableCars/SelectVehicule';
import VehiculeCalendar from '../Screens/Subbed/AviableCars/VehiculeCalendar';

////////////////
// Array for making the routes for the pictures in Damage and for the Inventories
////////////////

import { damageArray } from '../JSON/Fr/DamageArray';
import { inventoryArray } from '../JSON/Fr/InventoryArray';

////////////////
// Misc Imports
////////////////

import { blackA } from "../Shared/css"
import { CustomTabBarButton } from '../comps';

import useGlobalContext from '../Hooks/useGlobalContext';
import { addNotification } from '../Reducer/GlobalReducer/globalDispatch';

// Thats the bottom navigation
const Tab = createBottomTabNavigator();
// These are the only on that can be given a header 
const Stack = createStackNavigator()

// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';

// Tab icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

// Notifications.setNotificationHandler({
// handleNotification: async () => ({
// shouldShowAlert: true,
// shouldPlaySound: false,
// shouldSetBadge: false,
// }),
// })

// Principal Navigation
export default function AppNavigator() {

    const { globalDispatch } = useGlobalContext()

    const responseListener = React.useRef();
    const notificationListener = React.useRef();
    const [expoPushToken, setExpoPushToken] = React.useState('');

    // React.useEffect(() => {

    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         // console.log(notification)
    //     });

    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         //console.log("res", response);
    //     });

    //     // open a WebSocket connection
    //     // const ws = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');

    //     // ws.addEventListener('message', event => {
    //     // makeANofitication(JSON.parse(event.data))
    //     // });

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };

    // }, []);

    // async function makeANofitication(notif) {

    //     if (typeof notif === 'object' && notif !== null && notif.title && notif.body) {

    //         globalDispatch(addNotification(notif))

    //         await Notifications.scheduleNotificationAsync({
    //             content: {
    //                 title: notif.title,
    //                 body: notif.body,
    //             },
    //             trigger: { seconds: 2 },
    //         });
    //     }

    // }

    // async function registerForPushNotificationsAsync() {
    //     let token;

    //     if (Platform.OS === 'android') {

    //         await Notifications.setNotificationChannelAsync('default', {
    //             name: 'default',
    //             importance: Notifications.AndroidImportance.MAX,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: '#FF231F7C',
    //         });

    //     }

    //     if (Device.isDevice) {
    //         const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //         let finalStatus = existingStatus;

    //         if (finalStatus === 'denied') {
    //             // If the existing status is "denied", request permissions again
    //             const { status } = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }

    //         if (finalStatus !== 'granted') {
    //             const { status } = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }
    //         if (finalStatus !== 'granted') {
    //             alert('Failed to get push token for push notification!');
    //             return;
    //         }

    //         // So i just desactivated this line beaucause, well, i got a warning. I think its only if your subscribe to a firebase db.
    //         //  token = (await Notifications.getExpoPushTokenAsync()).data;

    //     } else {
    //         alert('Must use physical device for Push Notifications');
    //     }

    //     return token;
    // }

    ////////////////
    // Add Screen Names in this array where you don't want the tap bar to be displayed. \o/
    ////////////////

    const tabBarDisplayExclusionList = [
        "addId",
        "addLicence",
        "addSignature",
        "inventoryGeneralFrontPanel",
        "inventoryLeftFrontWheel",
        "inventoryFrontLeft",
        "inventoryBackLeft",
        "inventoryLeftBackWheel",
        "inventoryGeneralBackPanel",
        "inventoryRightBackWheel",
        "inventoryBackRight",
        "inventoryFrontRight",
        "inventoryRightFrontWheel",
        "inventoryAdditionalPhotos",
        "damageGeneralFrontPanel",
        "damageLeftFrontWheel",
        "damageFrontLeft",
        "damageBackLeft",
        "damageLeftBackWheel",
        "damageGeneralBackPanel",
        "damageRightBackWheel",
        "damageBackRight",
        "damageFrontRight",
        "damageRightFrontWheel",
        "damageAdditionalPhotos",
        "attributionCost",
    ]

    ////////////////
    // Account Stack
    ////////////////

    const StackAccount = ({ route }) => {

        return (

            <Stack.Navigator initialRouteName="MyAccount" >

                <Stack.Screen name="MyAccount"
                    component={MyAccount}
                    options={{
                        header: ({ navigation }) => {
                        },
                    }}
                />

                <Stack.Screen name="ModifyAccount"
                    component={ModifyAccount}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Modification information"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="ActivateAccount"
                    component={ActivateAccount}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Ajout de documents"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="addId"
                    component={AddPicture}
                    initialParams={{
                        textForObtention: `Afin de valider votre compte, votre employeur à besoin de votre pièce d'identité`,
                        dispatchGeneralType: `photoID`,
                        maxPics: 2
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeadersPics title={"Photo d'identité : recto verso"}
                                numberLenghtChecker={`photoID`}
                                nombreMax={"Maxiumum 2"}
                                navigation={navigation}
                            />
                        ),
                    }}
                />

                <Stack.Screen name="addLicence"
                    component={AddPicture}
                    initialParams={{
                        textForObtention: `Afin de valider votre compte, votre employeur à besoin de votre permis de conduire`,
                        dispatchGeneralType: `photoLicence`,
                        maxPics: 2
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeadersPics title={"Permis de conduire : recto verso"}
                                numberLenghtChecker={`photoLicence`}
                                nombreMax={"Maxiumum 2"}
                                navigation={navigation} />
                        ),
                    }}
                />

                {/*
                ////////////////
                // ADD SIGNATURE
                ////////////////
                  */}

                <Stack.Screen name="addSignature"
                    component={AddSignature} />

                {/*
                ////////////////
                // HISTORY (Reservations && Routes && Futur Reservations)
                ////////////////
                  */}


                <Stack.Screen name="History"
                    component={History}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Historique"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="HistoryRoutes"
                    component={AccordeonSingleItem}
                    initialParams={{
                        mapType: "userRoutes",
                        title: "Trajet"
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Préscédents Trajets"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="HistoryKeys"
                    component={AccordeonSingleItem}
                    initialParams={{
                        mapType: "userOldKeys",
                        title: "Clef"
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Clefs Numériques Obsolètes"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="HistoryNexReservation"
                    component={AccordeonSingleItem}
                    initialParams={{
                        mapType: "userNexReservations",
                        title: "Reservation"
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Prochaines réservations"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

            </Stack.Navigator>
        )
    }

    ////////////////
    // Car Stack
    ////////////////

    const StackCars = ({ route }) => {

        return (
            <Stack.Navigator initialRouteName="NumericalKey">

                <Stack.Screen name="NumericalKey"
                    component={NumericalKey}
                    options={{
                        header: ({ navigation }) => {
                        },
                    }}
                />


                <Stack.Screen name="SelectedVehicule"
                    component={SelectedVehicule}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Véhicule séléctionnée"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="Actions"
                    component={Actions}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Actions voiture"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

                <Stack.Screen name="NumericalKeys"
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Clefs Numériques"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                    component={NumericalKey} />

                <Stack.Screen name="Costs"
                    initialParams={{
                        dispatchGeneralType: "attributionCost",
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Côuts véhicules"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                    component={Costs} />


                <Stack.Screen name="attributionCost"
                    component={AddPicture}
                    initialParams={{
                        textForObtention: "Documents cout",
                        dispatchGeneralType: "attributionCost",
                        dispatchType: "attributionCostDoc",
                        maxPics: 5
                    }}
                    options={{
                        header: ({ navigation }) => (

                            <HeadersPics title={"Documents - cout"}
                                info={"attributionCostDoc"}
                                numberLenghtChecker={"attributionCost"}
                                nombreMax={"Maxiumum 5"}
                                navigation={navigation} />

                        ),
                    }}
                />

                <Stack.Screen name="Damage"
                    initialParams={{
                        dispatchGeneralType: "attributionDamage",
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Déclaration Sinistre"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                    component={Damage} />

                {damageArray.map(stack => (

                    <Stack.Screen key={stack.key}
                        name={stack.key}
                        component={AddPicture}
                        initialParams={{
                            textForObtention: stack.text,
                            dispatchGeneralType: "attributionDamage",
                            dispatchType: stack.key,
                            maxPics: 3
                        }}
                        options={{
                            header: ({ navigation }) => (

                                <HeadersPics title={stack.text}
                                    info={stack.key}
                                    numberLenghtChecker={"attributionDamage"}
                                    nombreMax={"Maxiumum 3"}
                                    navigation={navigation} />

                            ),
                        }}
                    />
                ))}


                <Stack.Screen name="CheckIn"
                    initialParams={{
                        dispatchGeneralType: "attributionInventory",
                        type: "CheckIn"
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Réalisation d'un état des lieux"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                    component={Inventory} />


                <Stack.Screen name="CheckOut"
                    initialParams={{
                        dispatchGeneralType: "attributionInventory",
                        type: "CheckOut"
                    }}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Réalisation d'un état des lieux"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                    component={Inventory} />


                {inventoryArray.map((stack, index) => (

                    <Stack.Screen key={stack.key}
                        name={stack.key}
                        component={AddPicture}
                        initialParams={{
                            textForObtention: stack.text,
                            dispatchGeneralType: "attributionInventory",
                            dispatchType: stack.key,
                            maxPics: 3,
                            indexInventory: index
                        }}

                        options={{
                            header: ({ navigation }) => (
                                <HeadersPics title={stack.text}
                                    info={stack.key}
                                    numberLenghtChecker={"attributionInventory"}
                                    nombreMax={"Maxiumum 3"}
                                    navigation={navigation} />

                            ),
                        }}
                    />
                ))}

                <Stack.Screen name="CarMap"
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Emplacement voiture"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                    component={CarLocation} />

                <Stack.Screen name="VirtualPouch"
                    component={VirtualPouch}
                    options={{
                        header: ({ navigation }) => (
                            <HeaderSubbed title={"Documents Pochette Virtuelle"}
                                navigation={navigation}
                                route={route}
                                initial={false} />
                        ),
                    }}
                />

            </Stack.Navigator >
        )
    }

    ////////////////
    // Notification Stack (for here for now)
    ////////////////

    const StackNotification = ({ route }) => {

        return (

            <Stack.Navigator initialRouteName="Notifs">

                <Stack.Screen name="Notifs"
                    component={Notifs}
                    options={{
                        header: ({ navigation }) => {
                        },
                    }}
                />

            </Stack.Navigator >
        )
    }

    ////////////////
    // Selected Vehicule Stack
    ////////////////

    const StackSelectedVehicule = ({ route }) => {
        return (
            <>
                <Stack.Navigator initialRouteName="Select">

                    <Stack.Screen name="Select"
                        component={SelectVehicle}
                        options={{
                            header: ({ navigation }) => {
                                (
                                    <HeaderSubbed
                                        navigation={navigation}
                                        route={route}
                                        initial={true} />
                                )
                            },
                        }}
                    />

                    <Stack.Screen name="VehiculeCalendar"
                        component={VehiculeCalendar}
                        options={{
                            header: ({ navigation }) => (
                                (
                                    <HeaderSubbed
                                        title={"Calendrier des disponibilités"}
                                        navigation={navigation}
                                        route={route}
                                        initial={false} />
                                )
                            ),
                        }}
                    />

                    <Stack.Screen name="MakeReservation"
                        component={MakeReservation}
                        options={{
                            header: ({ navigation }) => (
                                (
                                    <HeaderSubbed
                                        title={"Revervez"}
                                        navigation={navigation}
                                        route={route}
                                        initial={false} />
                                )
                            ),
                        }}
                    />

                </Stack.Navigator >

            </>
        )
    }

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
                    tabBarStyle: !tabBarDisplayExclusionList.includes(getFocusedRouteNameFromRoute(route)) ? styles.tabBarStyles : { display: "none" },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Account") {
                            iconName = focused ? "ios-settings" : "ios-settings-outline"
                        }
                        else if (route.name === "Car") {
                            iconName = focused ? "car-sport" : "car-sport-outline"

                        }
                        else if (route.name === "Vehicules") {
                            iconName = focused ? "cart-sharp" : "cart-outline"
                        }

                        else if (route.name === "Notification") {
                            iconName = focused ? "notifications" : "notifications-outline"
                        }

                        return (
                            <>
                                {iconName = focused ?

                                    <CustomTabBarButton>

                                        <Ionicons name={iconName} size={40} color={color} />

                                    </CustomTabBarButton>

                                    :

                                    <Ionicons name={iconName} size={25} color={color} />

                                }
                            </>
                        );
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                })}>

                {/* Current Car */}

                <Tab.Screen name="Car"
                    component={StackCars} />

                {/* Aviable Cars*/}
                <Tab.Screen name="Vehicules"
                    component={StackSelectedVehicule} />

                {/* Notifications*/}
                <Tab.Screen name="Notification"
                    component={StackNotification} />

                {/* Account Settings*/}
                <Tab.Screen name="Account"
                    component={StackAccount} />

            </Tab.Navigator>

        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    tabBarStyles: {
        backgroundColor: blackA,
        borderRadius: 20,
        position: "absolute",
        borderTopWidth: 0,
        left: 5,
        bottom: 10,
        right: 5,
    }

})
