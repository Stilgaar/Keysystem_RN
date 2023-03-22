import React from "react"
import { enableScreens } from 'react-native-screens';

// Important for Swipe gesture - Pinch-to-zoom -Drag and drop- Long press- Double tap
// import 'react-native-gesture-handler';

//import * as SplashScreen from 'expo-splash-screen';
// pour la police
// import * as Font from 'expo-font'

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
  // States for the things
  ////////////////


  // const [fontsLoaded, setFontsLoaded] = React.useState(false);
  // const [permission, setPermission] = React.useState(null);

  ////////////////
  // JSX
  ////////////////

  // const getFonts = async () => {
  // await SplashScreen.preventAutoHideAsync();
  // await Font.loadAsync({ 'brandonBold': require('./assets/Fonts/BrandonBold.otf') });
  // setFontsLoaded(true);
  // SplashScreen.hideAsync();
  // }

  ////////////////
  // Get the fonts (they're async in RN ...)
  ////////////////

  // React.useEffect(() => {
  // getFonts();
  // }, []);

  ////////////////
  // Dont load the app until the fonts are there buddy
  ////////////////

  // if (!fontsLoaded) return null

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

