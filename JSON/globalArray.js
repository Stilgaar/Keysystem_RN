import user from "./FAKEPERSON.json"
import keys from "./FAKEKEYS.json"

export const initialGlobalState = {
    isLogged: false,
    user: [],
    photoID: [],
    photoLicence: [],
    signature: [],
    currentCar: [],
    attributionDamage: [],
    notificationsList: [],
    attributionInventory: [],
    currentKeys: [],
}

// Faudra penser au moment du login ou je ne sais pas comment
// Intégrer les user

export const initialGlobalState1 = {
    isLogged: true,
    user: user,
    photoID: [],
    photoLicence: [],
    signature: [],
    currentKeys: keys,
    currentCar: [],
    reservationSelectCar: [],
    notificationsList: [],
    attributionDamage: [{
        generalDamageInfo: [{
            currentDate: new Date(),
            commentDamage: "",
            fullName: user[0].fullName,
            location: "",
            userGUID: user[0].userGUID,
            vehiculeGUID: ""
        }]
    }],
    attributionInventory: [{
        generalInventoryInfo: [{
            currentDate: new Date(),
            commentInventory: "",
            fullName: user[0].fullName,
            userGUID: user[0].userGUID,
            vehiculeGUID: ""
        }]
    }],
    attributionCost: [{
        costTotalHT: "",
        costTotalTTC: "",
        costTotalTVA: "",
        costTotal: "",
        userGUID: user[0].userGUID,
        vehiculeGUID: "",
    }],
    validationReservation: [{
        vehiculeGUID: "",
        userGUID: user[0].userGUID,
        startDate: new Date(),
        endDate: new Date()
    }]
}