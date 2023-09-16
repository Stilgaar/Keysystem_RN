// =]
import React from "react";

import { StateContext } from "../Context/StateContext";
import { DispatchContext } from "../Context/StateContext";

// My own component with expo camera in it
import MyCamera from "./MyCamera"

// The only function to add pics into the app (and afterwards, upload them)
import { addPictureDispatch } from "../Reducer/GlobalReducer/globalDispatch";

////////////////
// What's navigating the camera. It was easier to make a meta component to wrap the MyCamera component. 
// MyCamera would've been a bit overcharged. 
////////////////

export default function AddPicture({ navigation, route }) {

    ////////////////
    // Global State && Dispatch.
    ////////////////

    const { globalState } = React.useContext(StateContext)
    const { globalDispatch } = React.useContext(DispatchContext)

    ////////////////
    // Destructuring the route.parms to make the reading easier
    ////////////////

    const { dispatchGeneralType, dispatchType, textForObtention, maxPics, indexInventory } = route.params

    ////////////////
    // The gobackcondition() is to check how many pictures people can take
    // if the condition is true, the buton turn into a return button automaticly
    ////////////////

    const goBackCondition = () => {

        ////////////////
        // Simple cases, like photoID and photoLicence (usualy, max pics = 2)
        ////////////////

        if (!dispatchType) {

            return globalState?.[`${dispatchGeneralType}`]?.length === maxPics

        } else {

            ////////////////
            // Complex cases like in taking pics of "damage" or "inventory" (usualy, max pics = 3)
            // First he checks if there its already present, if not, well its false, so no goback
            ////////////////

            if (!globalState[`${dispatchGeneralType}`].hasOwnProperty(dispatchType)) {

                return false

            } else {

                ////////////////
                // If it exists, he finds the right object in the array. Then compare the lenght with what i told him in navigation.
                // easy ? Not really
                ////////////////

                return globalState?.[`${dispatchGeneralType}`]?.[dispatchType]?.length === maxPics;
            }
        }
    }

    ////////////////
    // JSX
    ////////////////

    return (

        <MyCamera
            routeType={route.params.routeType}
            navigation={navigation}
            dispatch={addPictureDispatch}
            dispatchGeneralType={dispatchGeneralType}
            dispatchType={dispatchType}
            globalDispatch={globalDispatch}
            goBackCondition={goBackCondition()}
            textForObtention={textForObtention}
            indexInventory={indexInventory}
        />

    );
}
