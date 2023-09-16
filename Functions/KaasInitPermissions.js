
import { KaaS } from "../ContinentalUtilities/KaasMethods"
import { PermissionsAndroid } from "react-native";

//////////////////////////////
// Init KaaS bridge connection TODO: Voir si pas déplacer vers le appcontainer / idem pour les permissions
//////////////////////////////

export const initKaaS = async () => {

    console.log('isProdMode', process.env.IsProdMode === "true")
    process.env.IsProdMode === "true" ? await KaaS.init(false, false, false, false) : await KaaS.init(true, true, false, true)
    console.log('init called:', KaaS.initCalled)
}

const requestPermission = async (permissionType, dialogTitle, dialogMessage) => {
    const granted = await PermissionsAndroid.check(permissionType);

    console.log(`Permission ${permissionType}?`, granted);

    if (!granted) {
        const requestResult = await PermissionsAndroid.request(permissionType, {
            title: dialogTitle,
            message: dialogMessage,
            buttonPositive: 'Accept',
            buttonNegative: 'Cancel',
        });

        if (requestResult !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log(`You can use the ${permissionType}`);
        } else {
            console.log(`${permissionType} permission denied`);
        }
    }
};

export const requestKaaSPermissions = async () => {
    await requestPermission(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        'Key System Bluetooth Connection Permission',
        'Key System needs to access to your bluetooth in order to connect to devices'
    );

    await requestPermission(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        'Key System Bluetooth Scan Permission',
        'Key System needs to access to your bluetooth scan in order to connect to devices'
    );

    await requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        'Key System Fine Location Permission',
        'Key System needs to access to your location in order to connect to devices'
    );

    await requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        'Key System Coarse Location Permission',
        'Key System needs to access to your coarse location in order to connect to devices'
    );
};