import React from "react"
import { enableScreens } from 'react-native-screens';

// Important for Swipe gesture - Pinch-to-zoom -Drag and drop- Long press- Double tap
// import 'react-native-gesture-handler';

// All Routes
import AppContainer from './Routes/AppContainer';

import { GlobalContextProvider } from './Context/GlobalContext';
import { StateContextProvider } from './Context/StateContext';

import { GestureHandlerRootView } from "react-native-gesture-handler";

// Welcome to KeySystem App
export default function App() {

  ////////////////
  // Needed in React native
  ////////////////

  enableScreens();

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

