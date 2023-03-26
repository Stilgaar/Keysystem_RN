import { createContext } from "react";
import React from "react";
import { initialGlobalState, initialGlobalState1 } from "../JSON/globalArray";
import { globalReducer } from "../Reducer/GlobalReducer/globalReducer";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const StateContext = createContext()
export const DispatchContext = createContext()

export const StateContextProvider = ({ children }) => {

    const [globalState, globalDispatch] = React.useReducer(globalReducer, initialGlobalState1);

    console.log("NOTIFLIST STATE CONTEXT", globalState.notificationsList)

    React.useEffect(() => {
        console.log("THERE")
        const storeGlobalState = async () => {
            try {
                await AsyncStorage.setItem('globalState', JSON.stringify(globalState));
            } catch (error) {
                console.error(error);
            }
        };
        storeGlobalState();

    }, [globalState]);

    return (
        <DispatchContext.Provider value={{ globalDispatch }}>
            <StateContext.Provider value={{ globalState }}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>

    )
}