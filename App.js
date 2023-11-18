import React from "react"
import { enableScreens } from 'react-native-screens';
// All Routes
import AppContainer from './Routes/AppContainer';

import { GlobalContextProvider } from './Context/GlobalContext';
import { StateContextProvider } from './Context/StateContext';

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { initKaaS, requestKaaSPermissions } from "./Functions/KaasInitPermissions";
import { configureMoment } from "./Functions/MomentConfig";

import * as Sentry from '@sentry/react-native';


// Welcome to KeySystem App
export default function App() {


  // NEW SENTRY TO GET LASTEST ERRORS 04/11/2023
  Sentry.init({
    dsn: "https://c7c7764438944e95c7cbfb71dc251684@o4505845053128704.ingest.sentry.io/4506168237948928",
    tracesSampleRate: 1.0,
  });
  ////////////////
  // Needed in React native
  ////////////////

  // TODO 
  // RESET DU REDUCER QUAND ON ENVOI - SINITRE - DOCUMENT - INVENTORY
  // CORRIGER INVENTORY POUR POUVOIR ENVOYER L'INVENTORY
  // CHECKER LE FONCTIONNEMENT DE ACTIONS
  // REGLER LES NOTIFICATIONS
  // HISTORIQUE ? -locations en attente ?- -précédents trajets- -précedentes clefs-

  enableScreens();

  // C'est sale mais c'est comme ça apparement...
  // Oui oui mettre ça dans l'app.js c'est plus que dégeu

  configureMoment()

  React.useEffect(() => {
    initKaaS()
    requestKaaSPermissions();
  }, [])

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

