import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';

// Important for Swipe gesture - Pinch-to-zoom -Drag and drop- Long press- Double tap
// import 'react-native-gesture-handler';

// All Routes
import AppContainer from './Routes/AppContainer';

import { GlobalContextProvider } from './Context/GlobalContext';
import { StateContextProvider } from './Context/StateContext';

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { KaaS } from "./ContinentalUtilities/KaasMethods";

// Welcome to KeySystem App
export default function App() {

  /////////////////////////
  // Needed in React native
  /////////////////////////

  enableScreens();

  //////////////////////////////
  // Init KaaS bridge connection
  //////////////////////////////
  console.log(KaaS.initCalled)
  useEffect(()=>{
    KaaS.init(true, true, false, true)
    console.log(KaaS.initCalled)
  }, []) // <-- empty dependency array
  

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

