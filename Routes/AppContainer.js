import React from 'react';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Navigation when unsubed
import RootNavigator from "./RootNavigator";
// Navigation when subbed
import AppNavigator from "./AppNavigator";
import useGlobalContext from '../Hooks/useGlobalContext';

import { darkgreyish } from '../Shared/css';

export default function AppContainer() {

    const { globalState } = useGlobalContext();
    const isLogged = React.useMemo(() => globalState.isLogged, [globalState.isLogged]);

    return (
        <SafeAreaProvider style={{ backgroundColor: darkgreyish }}>

            <SafeAreaView style={{ flex: 1, backgroundColor: darkgreyish }}>

                {isLogged ? <AppNavigator /> : <RootNavigator />}

            </SafeAreaView>

        </SafeAreaProvider>
    )

}

