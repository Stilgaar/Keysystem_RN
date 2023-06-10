// import user from "./FAKEPERSON.json"
import keys from "./FAKEKEYS.json"

export const initialUserState = {
    isLogged: false,
    user: [],
    notificationsList: [],
}

export const initialGlobalState = {
    photoID: [],
    photoLicence: [],
    photoDamage:[],
    signature: [],
    currentKeys: keys,
    reservationVehicles: [],
    virtualKeys: [],
    currentVirtualKey: {},
    companyVehicles: [],
    currentCar: {},
    reservationSelectCar: [],
    attributionDamage: [{
            fkVehicleGuid : "",
            fkUserGuid : "",
            damageDate: new Date(),
            ToInsurance: false,
            repairs: null,
            damageRepairsDateDone: null,
            isDriver: true,
            driverName: "",
            attributionDocs: []
    }],
    attributionInventory: [{
        generalInventoryInfo: [{
            currentDate: new Date(),
            commentInventory: "",
            fullName: "",
            userGuid: "",
            vehicleGuid: ""
        }]
    }],
    attributionCost: [{
        costTotalHT: "",
        costTotalTTC: "",
        costTotalTVA: "",
        costTotal: "",
        userGuid: "",
        vehicleGuid: "",
    }],
    validationReservation: [{
        vehicleGuid: "",
        userGuid: "",
        startDate: new Date(),
        endDate: new Date()
    }]
}

// Faudra penser au moment du login ou je ne sais pas comment
// Intégrer les user

// export const initialGlobalState1 = {
//     isLogged: true,
//     user: {},
//     photoID: [],
//     photoLicence: [],
//     signature: [],
//     currentKeys: keys,
//     currentCar: [],
//     reservationSelectCar: [],
//     notificationsList: [],
//     attributionDamage: [{
//         generalDamageInfo: [{
//             currentDate: new Date(),
//             commentDamage: "",
//             fullName: user.fullName,
//             location: "",
//             userGuid: user.userGuid,
//             vehicleGuid: ""
//         }]
//     }],
//     attributionInventory: [{
//         generalInventoryInfo: [{
//             currentDate: new Date(),
//             commentInventory: "",
//             fullName: user.fullName,
//             userGuid: user.userGuid,
//             vehicleGuid: ""
//         }]
//     }],
//     attributionCost: [{
//         costTotalHT: "",
//         costTotalTTC: "",
//         costTotalTVA: "",
//         costTotal: "",
//         userGuid: user.userGuid,
//         vehicleGuid: "",
//     }],
//     validationReservation: [{
//         vehicleGuid: "",
//         userGuid: user.userGuid,
//         startDate: new Date(),
//         endDate: new Date()
//     }]
// }