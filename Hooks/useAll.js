import React from "react";
import useSubmit from "./useSubmit";
// import useTheme from "./useTheme";

import { globalReducer } from "../Reducer/GlobalReducer/globalReducer";
import { initialGlobalState, initialGlobalState1 } from "../JSON/globalArray";

function useAll() {
  // NEED TO TRANSFER TO USEASYNCSTORAGE
  // const { theme, setTheme } = useTheme();

  const [globalState, globalDispatch] = React.useReducer(globalReducer, initialGlobalState1)

  // for all the sumbits and changes in inputs
  const { data, handleSubmit, handleChange, error, pending, resMsg } = useSubmit();

  const all = {
    // user state. Will be transfered to a globalReducer later
    globalState,
    globalDispatch,

    // for the inputs. Get them with handleChange and submit them with .. will you guess .
    data,
    handleSubmit,
    handleChange,
    pending,
    error,
    resMsg,

    // FOR LATERS Aligators !
    // themes settings
    //theme,
    // setTheme,

  };

  return { all };
}

export default useAll;
