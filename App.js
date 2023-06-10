import React from "react"
import { PermissionsAndroid } from "react-native";
import { enableScreens } from 'react-native-screens';

// Important for Swipe gesture - Pinch-to-zoom -Drag and drop- Long press- Double tap
// import 'react-native-gesture-handler';

// All Routes
import AppContainer from './Routes/AppContainer';

import { GlobalContextProvider } from './Context/GlobalContext';
import { StateContextProvider } from './Context/StateContext';

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { KaaS } from "./ContinentalUtilities/KaasMethods";
import useGlobalContext from "./Hooks/useGlobalContext";
import moment from "moment";

// Welcome to KeySystem App
export default function App() {

  ////////////////
  // Needed in React native
  ////////////////
  
  enableScreens();

  // C'est sale mais c'est comme ça apparement...
  moment.locale('fr', {
    months : 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort : 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
  });

  //////////////////////////////
  // Init KaaS bridge connection TODO: Voir si pas déplacer vers le appcontainer / idem pour les permissions
  //////////////////////////////
  const initKaaS = async () => {
    console.log('isProdMode', process.env.IsProdMode === "true")
    process.env.IsProdMode === "true" ? await KaaS.init(false, false, false, false) : await KaaS.init(true, true, false, true)
        console.log('init called:', KaaS.initCalled)
  }
  initKaaS()

  const requestKaaSPermissions = async () => {
        const grantedBluetoothConnect = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
        const grantedBluetoothScan = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
        const grantedAccessFineLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        const grantedAccessCoarseLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        console.log("Permission BLUETOOTH CONNECT ?", grantedBluetoothConnect)
        console.log("Permission BLUETOOTH SCAN ?", grantedBluetoothScan)
        console.log("Permission FINE LOCATION ?", grantedAccessFineLocation)
        console.log("Permission COARSE LOCATION ?", grantedAccessCoarseLocation)
        if(grantedBluetoothConnect === false) {
          const requestBLEConnect = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, {
            title: 'Key System Bluetooth Connection Permission',
            message:'Key System needs to access to your bluetooth in order to connect to devices',
            buttonPositive:'Accept',
            buttonNegative: 'Cancel'
          });
          if(requestBLEConnect !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the bluetooth connection');
    } else {
      console.log('Bluetooth connection permission denied');
    }
        }
        if(grantedBluetoothScan === false) {
          const requestBLEScan = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
            title: 'Key System Bluetooth Scan Permission',
            message:'Key System needs to access to your bluetooth scan in order to connect to devices',
            buttonPositive:'Accept',
            buttonNegative: 'Cancel'
          });
          if(requestBLEScan !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the bluetooth scan');
          } else {
            console.log('Bluetooth Scan permission denied');
          }
        }
        if(grantedAccessFineLocation === false){
          var requestFineLocation = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'Key System Fine Location Permission',
            message:'Key System needs to access to your location in order to connect to devices',
            buttonPositive:'Accept',
            buttonNegative: 'Cancel'
          });
          if(requestFineLocation !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the fine location');
          } else {
            console.log('Fine location permission denied');
          }
        }
        if(grantedAccessCoarseLocation === false){
          var requestCoarseLocation = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
            title: 'Key System Coarse location Permission',
            message:'Key System needs to access to your coarse location in order to connect to devices',
            buttonPositive:'Accept',
            buttonNegative: 'Cancel'
          });
          if(requestCoarseLocation !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the coarse location');
          } else {
            console.log('Coarse location permission denied');
          }
        }
    }
    requestKaaSPermissions();

  ////////////////
  // JSX
  ////////////////

  return (
    // All the routing of the app is in /Routes/AppContainer
    <GestureHandlerRootView style={{ flex: 1 }}>

      <StateContextProvider>

        <GlobalContextProvider>

          <AppContainer />

        </GlobalContextProvider>

      </StateContextProvider>

    </GestureHandlerRootView>

  );

}

