////////////////
// LOGIN STUFF (nof finished)
////////////////

export const loginDispatch = (loginInfo) => {
    return { type: "LOGIN_GLOBAL_REDUCER", payload: { loginInfo } }
}

export const logoutDispatch = () => {
    return { type: "LOGOUT_GLOBAL_DISPATCH" }
}

////////////////////////////////
////////////////
// SELECT VEHICULES
////////////////
////////////////////////////////

////////////////
// SELECT VEHICULES FROM VIRTUAL KEY
////////////////

export const getSelectedVehicule = (vehicle) => {
    return { type: "SET_SELECTED_VEHICULE", payload: { vehicle } }
}

////////////////
// SELECT VEHICULES FOR RESERVATION
////////////////

export const getSelectedVehiculeReseravation = (vehicule) => {
    return { type: "SET_SELECTED_VEHICULE_RESERVATION", payload: { vehicule } }
}

////////////////
// SELECT DATE FOR RESERVATION 
////////////////

export const setSelectedDateReservation = (date, type) => {
    return { type: "SET_SELECTED_VEHICULE_DATES", payload: { date, type } }
}

////////////////////////////////
////////////////
// INFO AND PICTURE ADD AND DEL (INVENTORY / DAMAGE)
////////////////
////////////////////////////////

////////////////
// add pics
////////////////

export const addPictureDispatch = (picture, dispatchGeneralType, dispatchType) => {
    return { type: "ADD_ANY_PICTURE", payload: { picture, dispatchGeneralType, dispatchType } }
}

////////////////
// del pics
////////////////

export const delPictureDispatch = (pictureIndex, dispatchGeneralType, dispatchType) => {
    return { type: "DELL_ANY_PICTURE", payload: { pictureIndex, dispatchGeneralType, dispatchType } }
}

////////////////
// inputs
////////////////

export const addInfoDispatch = (info, dispatchGeneralType, dispatchType, infoType) => {
    return { type: "ADD_ANY_INFO", payload: { info, dispatchGeneralType, dispatchType, infoType } }
}

////////////////
// add selector
////////////////

export const addDropDownInfo = (info, dispatchGeneralType, dispatchType, infoType, selectorIndex) => {
    return { type: "ADD_DROPDOWN_INFO", payload: { info, dispatchGeneralType, dispatchType, infoType, selectorIndex } }
}

////////////////
// del selector
////////////////

export const delDropDownInfo = (removeItem, dispatchGeneralType, dispatchType, infoType, selectorIndex) => {
    return { type: "DEL_DROPDOWN_INFO", payload: { removeItem, dispatchGeneralType, dispatchType, infoType, selectorIndex } }
}

////////////////////////////////
////////////////
// SIGNATURE STUFF
////////////////
////////////////////////////////

export const addSignature = (svgSignature) => {
    return { type: "ADD_SIGNATURE_SVG", payload: { svgSignature } }
}

export const delSignature = () => {
    return { type: "DEL_SIGNATURE_SVG" }
}

////////////////////////////////
////////////////
// NOTIFICATIONS
////////////////
////////////////////////////////

export const addNotification = (notification) => {
    return { type: "NOTIFICATION_ADD_ONE", payload: { notification } }
}

export const delNotification = (notificationIndex) => {
    return { type: "NOTIFICATIONS_DEL_ONE", payload: { notificationIndex } }
}

export const delAllNotification = () => {
    return { type: "NOTIFICATION_DEL_ALLS" }
}

////////////////////////////////
////////////////
// COSTS
////////////////
////////////////////////////////

export const costSelectType = (selected) => {
    return { type: "COST_SELECT_TYPE", payload: { selected } }
}

export const costPriceAdd = (price, infoType) => {
    return { type: "COST_ADD_PRICE", payload: { price, infoType } }
}