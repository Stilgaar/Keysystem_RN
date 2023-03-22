import { createContext } from "react";
import React from "react";
import { initialGlobalState, initialGlobalState1 } from "../JSON/globalArray";
import { globalReducer } from "../Reducer/GlobalReducer/globalReducer";

export const StateContext = createContext()
export const DispatchContext = createContext()

export const StateContextProvider = ({ children }) => {

    const [globalState, globalDispatch] = React.useReducer(globalReducer, initialGlobalState1)

    return (
        <DispatchContext.Provider value={{ globalDispatch }}>
            <StateContext.Provider value={{ globalState }}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>

    )
}