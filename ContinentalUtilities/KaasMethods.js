import { NativeModules, NativeEventEmitter } from 'react-native';

export class KaaS {

    static kaasModule = NativeModules.KaaSModule;
    static kaasLogEventEmitter = new NativeEventEmitter(KaaS.kaasModule);
    static kaasBleStateEventEmitter = new NativeEventEmitter(KaaS.kaasModule);
    static initCalled = false;

    static async init(allowDebugMode, allowRooted, allowRunOnSimulator, enableDebugLog) {
        try {
            if (!KaaS.initCalled) {
                const result = KaaS.kaasModule._init(allowDebugMode, allowRooted, allowRunOnSimulator, enableDebugLog);

                if (KaaS.kaasLogEventEmitter.listenerCount('kaas_log_event') == 0) {
                    KaaS.kaasLogEventEmitter.addListener('kaas_log_event', (message) => {
                        console.log(Date() + ": [KaaS SDK Logs] : " + message);
                    });
                }
                this.initCalled = true;
                return result;
            }
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async isSessionOpen() {
        try {
            return await KaaS.kaasModule.isSessionOpen();
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async createSessionRequestToken() {
        try {
            return await KaaS.kaasModule.createSessionRequestToken();
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async openSession(token) {
        try {
            return await KaaS.kaasModule.openSession(token);
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async closeSession() {
        try {
            return await KaaS.kaasModule.closeSession();
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async getVirtualKeys() {
        try {
            const result = await KaaS.kaasModule.getVirtualKeys();
            let virtualKeys = JSON.parse(result);
            return virtualKeys;
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async selectVirtualKey(id) {
        try {
            const result = await KaaS.kaasModule.selectVirtualKey(id);
            let virtualKey = JSON.parse(result);
            return virtualKey;
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async getSelectedVirtualKey() {
        try {
            const result = await KaaS.kaasModule.getSelectedVirtualKey();
            let virtualKey = JSON.parse(result);
            return virtualKey;
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async connect() {
        try {
            return await KaaS.kaasModule.connect(10, false);
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async isConnected() {
        try {
            return await KaaS.kaasModule.isConnected();
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async scan(timeout) {
        try {
            return await KaaS.kaasModule.scan(timeout);
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async sendCommand(commandName) {
        try {
            return await KaaS.kaasModule.sendCommand(commandName);
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }

    static async bluetoothStateChanged() {
        try {
            if (KaaS.kaasLogEventEmitter.listenerCount('kaas_bluetooth_state_event') == 0) {
                KaaS.kaasLogEventEmitter.addListener('kaas_bluetooth_state_event', (state) => {
                    return state;
                });
            }
        } catch (e) {
            // Handle any errors that occurred during the fetch request
            console.error("KAASMETHODS", "ERROR MESSAGE: ", e.errorMessage, "ERROR:", e);
        }
    }
}