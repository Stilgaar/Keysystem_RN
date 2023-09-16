import { format } from 'date-fns'

const defaultAttributionCost = {
    attributionDocs: [],
    costAdditionalCost: "",
    costAmount: "",
    costDoneDate: new Date(),
    userGuid: "",
    vehicleGuid: ""
};

import { initialGlobalState, initialUserState } from '../../JSON/globalArray';

import keys from "../../JSON/FAKEKEYS.json"

export const globalUserReducer = (prevState, action) => {

    console.log("ACTION.TYPE USER DISPATCH", action.type)

    switch (action.type) {

        case 'SET_GLOBAL_STATE': {

            const { storedState } = action.payload

            return {
                ...storedState
            }

        }
        ////////////////
        // LOGIN STUFF (nof finished)
        ////////////////

        case "LOGIN_GLOBAL_REDUCER": {

            return {
                isLogged: true,
                user: action.payload.loginInfo,
                currentKeys: keys,
                notificationsList: []
            }
        }

        case "LOGOUT_GLOBAL_DISPATCH": {

            return {
                ...initialUserState
            }

        }

        ////////////////
        // NOTIFICATION REDUCERS
        ////////////////

        case "NOTIFICATION_ADD_ONE": {

            let state;

            const { notification } = action.payload

            state = [...prevState.notificationsList]

            const date = new Date()

            let newNotification = {
                body: notification.body,
                title: notification.title,
                date: format(date, "dd-MM-yyyy - HH:mm:ss")
            }

            state.push(newNotification)


            return {
                ...prevState,
                notificationsList: state
            }
        }

        case "NOTIFICATIONS_DEL_ONE": {

            let state;

            const { notificationIndex } = action.payload

            state = [...prevState.notificationsList]
            state.splice(notificationIndex, 1)


            return {
                ...prevState,
                notificationsList: state
            }
        }

        case "NOTIFICATION_DEL_ALLS": {

            return {
                ...prevState,
                notificationsList: []
            }
        }

        default:
            console.warn(`HI JEFF, JSAUCE HERE, YOU SHOULND GET THAT (or you forgot somehting)`)
            return prevState
    }


}

export const globalReducer = (prevState, action) => {

    // makes life easier
    console.log("ACTION.TYPE GLOBAL DISPATCH", action.type)
    // console.log("PREVSTATE", prevState)

    switch (action.type) {

        case 'SET_GLOBAL_STATE': {

            const { storedState } = action.payload

            return {
                ...storedState
            }

        }

        case "LOGIN_GLOBAL_REDUCER": {

            //resets the localStorage when we log in again to make a clean one.


            return {
                ...initialGlobalState
            }

        }


        case 'RESET_INITIAL_STATE_LOGGOUT': {
            return {
                ...initialGlobalState
            }
        }





        ////////////////
        // SELECT VEHICULES FROM VIRTUAL KEY
        ////////////////

        case "SET_SELECTED_VEHICULE": {

            // heres hes an array
            const { vehicle } = action.payload

            return {
                ...prevState,
                currentCar: vehicle,
                attributionDamage: {
                    ...prevState.attributionDamage,
                    vehicleGuid: vehicle.vehicleGuid
                },
                attributionInventory: {
                    ...prevState.attributionInventory,
                    generalInventoryInfo: [{
                        ...prevState.attributionInventory?.generalInventoryInfo?.[0],
                        vehicleGuid: vehicle.vehicleGuid,
                    }]
                },
                attributionCost: {
                    ...prevState.attributionCost,
                    vehicleGuid: vehicle.vehicleGuid,
                }
            }
        }

        ////////////////
        // SELECT VEHICULES FOR RESERVATION
        ////////////////

        case "SET_SELECTED_VEHICULE_RESERVATION": {

            // heres hes an object
            const { vehicule } = action.payload

            return {
                ...prevState,
                validationReservation: [{
                    ...prevState.validationReservation[0],
                    vehicleGuid: vehicule.vehicleGuid,
                    startDate: new Date(),
                    endDate: new Date()
                }]
            }
        }

        ////////////////
        // SELECT DATE FOR RESERVATION 
        ////////////////

        case "SET_SELECTED_VEHICULE_DATES": {

            const { date, type } = action.payload

            return {
                ...prevState,
                validationReservation: [{
                    ...prevState.validationReservation[0],
                    [type]: date
                }]
            }
        }

        ////////////////
        // Add any picture from anywhere. Would need a dispatchGeneralType at least.  
        // THIS WORKS NOW, everywhere
        ////////////////


        case "ADD_ANY_PICTURE": {

            let state;

            const { picture, dispatchGeneralType, dispatchType } = action.payload;


            state = prevState[`${dispatchGeneralType}`]

            console.log("state", state)

            if (!dispatchType) {
                state.push({ documentFormFile: { uri: picture.uri, type: 'image/jpeg', name: picture.name } });
            } else {
                state.attributionDocs.push({
                    documentFormFile: { uri: picture.uri, type: 'image/jpeg', name: picture.name },
                    displayName: picture.name
                })
            }

            return {
                ...prevState,
                [`${dispatchType}`]: {
                    ...state
                }
            }
        }

        ////////////////
        // Del Any Pic
        ////////////////

        case "DELL_ANY_PICTURE": {

            const { pictureIndex, dispatchGeneralType, dispatchType } = action.payload;

            let stateObject = prevState[`${dispatchGeneralType}`]

            if (!dispatchType) {

                const keys = Object.keys(stateObject);
                if (keys[pictureIndex]) {
                    stateObject.splice(pictureIndex, 1);
                }

            } else {

                if (stateObject[dispatchType]) {
                    stateObject[dispatchType].splice(pictureIndex, 1);

                    if (stateObject[dispatchType].length === 0) {
                        delete stateObject[dispatchType];
                    }
                }
            }

            return {
                ...prevState,
                [dispatchGeneralType]: stateObject
            };
        }

        ////////////////
        // Add infos from the different inputs in the app
        ////////////////

        case "ADD_ANY_INFO": {

            let state;

            const { info, dispatchGeneralType, dispatchType, infoType } = action.payload;

            // it exists ! 
            state = [...prevState[`${dispatchGeneralType}`]]

            // checks for the index after that
            const updatedTypeIndex = state.findIndex(item => item[dispatchType]);

            // checks the thingy he needs to update. If not there, he creates it
            const updatedType = state[updatedTypeIndex];

            // and updates the info
            const updatedInfo = [{ ...updatedType[dispatchType][0], [infoType]: info }];

            // and update the state MFER !
            return {
                ...prevState,
                [dispatchGeneralType]: [

                    {
                        [dispatchType]: updatedInfo
                    },
                ]
            };
        }

        ////////////////
        // Add dropdownInfo from the different selectors in the app
        ////////////////

        case "ADD_DROPDOWN_INFO": {

            // Add && Del are a bit complicated ... 

            const { info, dispatchGeneralType, dispatchType, infoType, selectorIndex } = action.payload;

            return {
                // So I return the part of the initialstate
                ...prevState,

                // The dispatchGeneralType is the general type i need to check in
                [dispatchGeneralType]: prevState[dispatchGeneralType].map(obj => {

                    // it checks if it has the propriety dispatchType
                    if (obj.hasOwnProperty(dispatchType)) {

                        return {
                            // if it has the obj
                            ...obj,

                            // so afther that he checks in the objs has the selectorIndex
                            [dispatchType]: obj[dispatchType].map((item, index) => {

                                if (index === selectorIndex) {

                                    // Then it maps the options
                                    return {

                                        ...item,
                                        [infoType]: info.value

                                    };
                                }

                                // else it returns just the item
                                return item;
                            })
                        };
                    }
                    // if not, it returns just the obj

                    return obj;
                })
            };

        }


        // RESET MODE TO HANDLE (width !dispatchType also, for PhotoId and stuff from the stuff)
        case "ATTRIBUTION_RESET_AFTER_POST": {

            const { dispatchGeneralType, dispatchType } = action.payload

            let state = prevState[`${dispatchGeneralType}`];

            state = Object.keys(state).reduce((initialState, key) => {

                if (key === "attributionDocs") {

                    initialState[key] = [];

                } else {

                    initialState[key] = "";
                }
                return initialState;
            }, {});

            return {
                ...prevState,
                [dispatchGeneralType]: state,
            };
        }


        ////////////////
        // Del dropdownInfo from the different selectors in the app
        ////////////////

        case "DEL_DROPDOWN_INFO": {

            const { removeItem, dispatchGeneralType, dispatchType, infoType, selectorIndex } = action.payload;

            return {

                ...prevState,

                [dispatchGeneralType]: prevState[dispatchGeneralType].map(obj => {

                    if (obj.hasOwnProperty(dispatchType)) {

                        return {

                            ...obj,

                            [dispatchType]: obj[dispatchType].map((item, index) => {

                                if (index === selectorIndex) {

                                    return {

                                        ...item,

                                        [infoType]: item[infoType].filter(option => option !== removeItem)

                                    };
                                }
                                return item;
                            })
                        };
                    }
                    return obj;
                })
            };
        }

        ////////////////
        // SIGNATURE REDUCER
        ////////////////

        case "ADD_SIGNATURE_SVG": {

            const { svgSignature } = action.payload

            return {
                ...prevState,
                signature: [svgSignature]
            }
        }

        case "DEL_SIGNATURE_SVG": {

            return {
                ...prevState,
                signature: []
            }
        }

        ////////////////
        // COSTS
        ////////////////


        case "COST_SELECT_TYPE": {

            let state;

            const { selected } = action.payload

            state = prevState.attributionCost
            state.costTypeGuid = selected.value

            return {
                ...prevState,
                attributionCost: state
            }
        }

        case "COST_ADD_INFO": {

            let state;

            const { info, infoType } = action.payload

            state = prevState.attributionCost
            state[`${infoType}`] = info
            return {
                ...prevState,
                attributionCost: state

            }

        }

        // VIRUTAL KEYS

        case "ADD_VIRTUAL_KEYS": {

            const { arrayReservations, arrayKeys } = action.payload

            return {
                ...prevState,
                virtualKeys: arrayKeys,
                reservationVehicles: arrayReservations
            }
        }

        case "SET_CURRENT_KEY": {
            const { currentKey } = action.payload

            console.log("CURRENTKEY", currentKey)

            return {
                ...prevState,
                currentVirtualKey: currentKey
            }
        }

        ////////////////
        // YOU SOULND BE THERE
        ////////////////

        default:
            console.warn(`HI JEFF, JSAUCE HERE, YOU SHOULND GET THAT (or you forgot somehting)`)
            return prevState
    }


}



/* const { info, dispatchGeneralType, dispatchType, infoType } = action.payload;

// check if it exists
const state = prevState[dispatchGeneralType] || [];

// checks for the index after that
const updatedTypeIndex = state.findIndex(item => item[dispatchType]);

// checks the thingy he needs to update. If not there, he creates it
const updatedType = state[updatedTypeIndex] || { [dispatchType]: [] };

// and updates the info
const updatedInfo = { ...updatedType[dispatchType][0], [infoType]: info };

// and update the state MFER !
return {
    ...prevState,
    [dispatchGeneralType]: [

        ...state.slice(0, updatedTypeIndex),

        {
            [dispatchType]: [updatedInfo]
        },

        ...state.slice(updatedTypeIndex + 1)
    ]
}; */


// OLD ADD PICTURE

// console.log("PIC", picture)

// let state;

// if (Array.isArray(prevState[`${dispatchGeneralType}`])) {
//     // Handle array logic
//     state = [...prevState[`${dispatchGeneralType}`]];

//     if (!dispatchType) {
//         state.push({ documentFormFile: picture });
//     } else {
//         if (!state.some(obj => obj[dispatchType])) {
//             let newState = { [`${dispatchType}`]: [{ documentFormFile: picture, displayName: picture.name }] };
//             state.push(newState);
//         } else {
//             const findobjectToUpdate = state.find(object => object[dispatchType]);
//             findobjectToUpdate[dispatchType].push({ documentFormFile: picture, displayName: picture.name });
//         }
//     }

//     return {
//         ...prevState,
//         [dispatchGeneralType]: state
//     };

// } else if (typeof prevState[`${dispatchGeneralType}`] === 'object' && prevState[`${dispatchGeneralType}`] !== null) {
//     // Handle object logic
//     state = { ...prevState[`${dispatchGeneralType}`] };

//     if (!dispatchType) {
//         state.jpgFile = picture;
//     } else {
//         if (!state[dispatchType]) {
//             state[dispatchType] = [{ documentFormFile: picture.uri, displayName: picture.name }];
//         } else {
//             state[dispatchType].push({ documentFormFile: picture.uri, displayName: picture.name });
//         }
//     }

//     return {
//         ...prevState,
//         [dispatchGeneralType]: state
//     };

// } else {
//     // If it's neither an array nor an object, return prevState.
//     return prevState;
// }