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
        inventoryMileage: 15643,
        inventorySafetyKit: true,
        inventorySpareWheel: true,
        inventoryRepairKit: true,
        inventoryAdditionalEquipment: true,
        inventoryMountainLawEquipment: true,
        attributionDocs: [],
    },
    attributionCost: {
        costTypeGuid: "",
        userGuid: "",
        vehicleGuid: "",
        costDoneDate: new Date(),
        costMileage: "",
        costAmount: "",
        costAdditionalCost: "",
        attributionDocs: [],
    },
    validationReservation: {
        vehicleGuid: "",
        userGuid: "",
        startDate: new Date(),
        endDate: new Date()
    }
}
