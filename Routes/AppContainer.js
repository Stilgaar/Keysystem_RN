import React from 'react';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Navigation when unsubed
import RootNavigator from "./RootNavigator";
// Navigation when subbed
import AppNavigator from "./AppNavigator";
import useGlobalContext from '../Hooks/useGlobalContext';

export default function AppContainer() {

    const { globalState } = useGlobalContext();
    const isLogged = React.useMemo(() => globalState.isLogged, [globalState.isLogged]);

    return (
        <SafeAreaProvider>

            <SafeAreaView style={{ flex: 1 }}>

                {isLogged ? <AppNavigator /> : <RootNavigator />}

            </SafeAreaView>

        </SafeAreaProvider>
    )

}

