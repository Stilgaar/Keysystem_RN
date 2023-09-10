// =]
import React from 'react';

// Dont remember why but really needed
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Navigation when unsubed
import RootNavigator from "./RootNavigator";

// Navigation when subbed
import AppNavigator from "./AppNavigator";
import useGlobalContext from '../Hooks/useGlobalContext';

// Waiting Screen
import SplashScreen from '../Screens/Unsub/Splash';

// LOL
import { darkgreyish } from '../Shared/css';

export default function AppContainer() {

    // To control the splash screen
    const [splash, setSplash] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setSplash(false), 1000);
    }, []);

    const { userState } = useGlobalContext();

    const isLogged = React.useMemo(() => userState.isLogged, [userState.isLogged]);

    // console.log("uerState", userState)

    return (

        <SafeAreaProvider style={{ backgroundColor: darkgreyish }}>

            <SafeAreaView style={{ flex: 1, backgroundColor: darkgreyish }}>

                <>

                    {splash ?

                        <SplashScreen />

                        :
                        <>

                            {isLogged ?

                                <AppNavigator />

                                :

                                <RootNavigator />

                            }

                        </>
                    }

                </>
            </SafeAreaView>

        </SafeAreaProvider>
    )

}

