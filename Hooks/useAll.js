import React from "react";
import useSubmit from "./useSubmit";
// import useTheme from "./useTheme";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { globalUserReducer } from "../Reducer/GlobalReducer/globalReducer";
import { initialUserState, initialGlobalState1 } from "../JSON/globalArray";

function useAll() {
  // NEED TO TRANSFER TO USEASYNCSTORAGE
  // const { theme, setTheme } = useTheme();
  const [userState, userDispatch] = React.useReducer(globalUserReducer, initialUserState);

  React.useEffect(() => {

    const fetchStoredState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('userState');
        if (storedState !== null) {
          userDispatch({ type: 'SET_GLOBAL_STATE', payload: { storedState: JSON.parse(storedState) } });
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
        await AsyncStorage.setItem('userState', JSON.stringify(userState));

      } catch (error) {
        console.error(error);
      }
    };
    storeGlobalState();

  }, [userState]);


  // for all the sumbits and changes in inputs
  const { data, handleSubmit, handleChange, error, pending, resMsg } = useSubmit();

  const all = {
    // user state. Will be transfered to a globalReducer later
    userState,
    userDispatch,

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


