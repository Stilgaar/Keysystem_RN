import { format } from 'date-fns'

import { initialGlobalState, initialUserState } from '../../JSON/globalArray';

import keys from "../../JSON/FAKEKEYS.json"

export const globalUserReducer = (prevState, action) => {


    console.log("ACTION.TYPE", action.type)

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
                isLogged: false,
                user: [],
                currentKeys: [],
                notificationsList: []
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
    console.log("ACTION.TYPE", action.type)

    switch (action.type) {

        case 'SET_GLOBAL_STATE': {

            const { storedState } = action.payload

            return {
                ...storedState
            }

        }


        ////////////////
        // SELECT VEHICULES FROM VIRTUAL KEY
        ////////////////

        case "SET_SELECTED_VEHICULE": {

            // heres hes an array
            const { vehicule } = action.payload

            return {
                ...prevState,
                currentCar: vehicule,
                attributionDamage: [{
                    ...prevState.attributionDamage[0],
                    generalDamageInfo: [{
                        ...prevState.attributionDamage[0].generalDamageInfo[0],
                        vehiculeGUID: vehicule[0].vehiculeGUID
                    }]
                }],
                attributionInventory: [{
                    ...prevState.attributionInventory[0],
                    generalInventoryInfo: [{
                        ...prevState.attributionInventory[0].generalInventoryInfo[0],
                        vehiculeGUID: vehicule[0].vehiculeGUID,
                    }]
                }],
                attributionCost: [{
                    ...prevState.attributionCost[0],
                    vehiculeGUID: vehicule[0].vehiculeGUID,
                }]

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
                    vehiculeGUID: vehicule.vehiculeGUID,
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

            state = [...prevState[`${dispatchGeneralType}`]]

            if (!dispatchType) {
                state.push({ jpgFile: picture });

            } else {

                if (!state.some(obj => obj[dispatchType])) {

                    let newState = { [`${dispatchType}`]: [{ jpgFile: picture, damageTypes: [] }] }

                    state.push(newState)

                } else {

                    const findobjectToUpdate = state.find(object => object[dispatchType]);
                    findobjectToUpdate[dispatchType].push({ jpgFile: picture, damageTypes: [] })
                }
            }

            return {
                ...prevState,
                [dispatchGeneralType]: state
            };
        }


        ////////////////
        // Del Any Pic
        ////////////////

        case "DELL_ANY_PICTURE": {

            let state;

            const { pictureIndex, dispatchGeneralType, dispatchType } = action.payload;

            state = [...prevState[`${dispatchGeneralType}`]]

            if (!dispatchType) {

                state.splice(pictureIndex, 1)

            } else {

                const findobjectToDelete = state.find(object => object[dispatchType]);
                findobjectToDelete[dispatchType].splice(pictureIndex, 1)

                if (findobjectToDelete[dispatchType].length === 0) {
                    state.filter(object => object !== findobjectToDelete);
                }
            }

            return {
                ...prevState,
                [dispatchGeneralType]: state
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

            state = [...prevState.attributionCost]
            state[0].costType = selected.value


            return {
                ...prevState,
                attributionCost: state
            }
        }

        case "COST_ADD_PRICE": {

            let state;

            const { price, infoType } = action.payload

            state = [...prevState.attributionCost]
            state[0][`${infoType}`] = price

            return {
                ...prevState,
                attributionCost: state

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