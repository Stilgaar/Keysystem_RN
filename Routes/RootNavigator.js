// Needed to create any navigation en React Native
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderUnsub from "../Shared/Headers/HeaderUnsub"
import Login from "../Screens/Unsub/Login"


const Stack = createNativeStackNavigator()

// Unsub navigation. Prettry StraightForward. 
// Uses Login and Signup components that you can find in /Screens/Unsub/..
export default function RootNavigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

                <Stack.Screen name="Login"
                    component={Login}
                    options={{ header: () => <HeaderUnsub title={`KS - Log in`} /> }}
                />

            </Stack.Navigator>
        </NavigationContainer>

    )
}