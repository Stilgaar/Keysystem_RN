import { NativeModules, NativeEventEmitter } from 'react-native';

export class KaaS {
    static kaasModule = NativeModules.KaaSModule;
    static kaasLogEventEmitter = new NativeEventEmitter(KaaS.kaasModule);
    static kaasBleStateEventEmitter = new NativeEventEmitter(KaaS.kaasModule);    
    static initCalled = false; 
    
    static async init(allowDebugMode, allowRooted, allowRunOnSimulator, enableDebugLog) {
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
    }       
        
    static async isSessionOpen() {
        return await KaaS.kaasModule.isSessionOpen();       
    }

    static async createSessionRequestToken() {
        return await KaaS.kaasModule.createSessionRequestToken();       
    }

    static async openSession(token) {
        return await KaaS.kaasModule.openSession(token);
    }

    static async closeSession() {
        return await KaaS.kaasModule.closeSession();
    }

    static async getVirtualKeys() {
        const result = await KaaS.kaasModule.getVirtualKeys();
        let virtualKeys = JSON.parse(result); 
        return virtualKeys;
    }

    static async selectVirtualKey(id) {
        const result = await KaaS.kaasModule.selectVirtualKey(id);
        let virtualKey = JSON.parse(result); 
        return virtualKey;
    }

    static async getSelectedVirtualKey() {
        const result = await KaaS.kaasModule.getSelectedVirtualKey();
        let virtualKey = JSON.parse(result); 
        return virtualKey;

    }

    static async connect() {
        return await KaaS.kaasModule.connect(10, false);
    }

    static async bluetoothStateChanged() {
        if (KaaS.kaasLogEventEmitter.listenerCount('kaas_bluetooth_state_event') == 0) {
            KaaS.kaasLogEventEmitter.addListener('kaas_bluetooth_state_event', (state) => {
                return state;
            });    
        }
    }
}