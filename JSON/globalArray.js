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
    photoDamage: [],
    signature: [],
    currentKeys: keys,
    reservationVehicles: [],
    virtualKeys: [],
    currentVirtualKey: {},
    companyVehicles: [],
    currentCar: {},
    reservationSelectCar: [],
    attributionDamage: {
        vehicleGuid: "",
        userGuid: "",
        damageDate: new Date(),
        ToInsurance: false,
        repairs: null,
        damageRepairsDateDone: null,
        isDriver: true,
        driverName: "",
        attributionDocs: []
    },
    attributionInventory: {
        generalInventoryInfo: [{
            currentDate: new Date(),
            commentInventory: "",
            fullName: "",
            userGuid: "",
            vehicleGuid: ""
        }]
    },
    attributionCost: {
        costTypeGuid: "",
        costAmount: "",
        costAdditionalCost: "",
        userGuid: "",
        vehicleGuid: "",
        costDoneDate: new Date(),
        attributionDocs: [],
        costMileage: "",
    },
    validationReservation: {
        vehicleGuid: "",
        userGuid: "",
        startDate: new Date(),
        endDate: new Date()
    }
}
