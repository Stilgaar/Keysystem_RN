import { createContext, useEffect } from "react";
import React from "react";
import { initialGlobalState, initialGlobalState1 } from "../JSON/globalArray";
import { globalReducer } from "../Reducer/GlobalReducer/globalReducer";

export const StateContext = createContext()
export const DispatchContext = createContext()

import AsyncStorage from "@react-native-async-storage/async-storage";

export const StateContextProvider = ({ children }) => {

    const [globalState, globalDispatch] = React.useReducer(globalReducer, initialGlobalState);

    React.useEffect(() => {

        const fetchStoredState = async () => {
            try {
                const storedState = await AsyncStorage.getItem('globalState');
                if (storedState !== null) {
                    globalDispatch({ type: 'SET_GLOBAL_STATE', payload: { storedState: JSON.parse(storedState) } });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStoredState();

    }, []);


    React.useEffect(() => {

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