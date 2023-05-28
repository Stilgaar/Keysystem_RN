package com.ffs;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.continental.kaas.library.KAAS;
import com.continental.kaas.library.external.Command;
import com.continental.kaas.library.external.SelectVirtualKeyRequest;
import com.continental.kaas.library.external.SessionResponse;
import com.continental.kaas.logging.Plop;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import io.reactivex.disposables.Disposable;

public class KaaSModule extends ReactContextBaseJavaModule {

    static String BLUETOOTH_STATE_EVENT = "kaas_bluetooth_state_event";
    static String CONNECTION_STATE_EVENT = "kaas_connection_state_event";
    static String LOG_EVENT = "kaas_log_event";
    private Disposable disposableBluetoothStateChange;
    private Disposable disposableConnectionStateChange;


    public KaaSModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "KaaSModule";
    }

    @ReactMethod
    public void _init(boolean allowDebugMode, boolean allowRooted,
                     boolean allowRunOnSimulator, boolean enableDebugLog, Promise promise) {
        KAAS.Config config = new KAAS.Config(this.getCurrentActivity().getApplication());

        if (allowDebugMode) {
            config.allowDebugMode();
        }
        if (allowRooted) {
            config.allowRooted();
        }
        if (allowRunOnSimulator) {
            config.allowRunOnSimulator();
        }
        if (enableDebugLog) {
            config.setLogger(new Plop.Tree(Plop.Level.VERBOSE, new CustomLogger(getReactApplicationContext()), 3));
        }

        KAAS.shared.init(config);
        promise.resolve(true);
    }

    @ReactMethod
    public void isSessionOpen(Promise promise) {
        boolean isSessionOpened = KAAS.shared.isSessionOpened();
        promise.resolve(isSessionOpened);
    } 

    @ReactMethod
    public void createSessionRequestToken(Promise promise) {
        Disposable disposable = KAAS.shared.createSessionRequestToken()
            .rx()
            .subscribe((sessionRequestToken, throwable) -> {
                if (sessionRequestToken != null) {
                    promise.resolve(sessionRequestToken.getToken());
                } else {
                    promise.reject(throwable);
                }
            });
    }

    @ReactMethod
    public void openSession(String token, Promise promise) {
        Disposable disposable = KAAS.shared.openSession(SessionResponse.with(token))
                .rx()
                .subscribe((openSessionResult, throwable) -> {
                    if (openSessionResult != null) {
                        promise.resolve(true);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void closeSession(Promise promise) {
        Disposable disposable = KAAS.shared.closeSession()
                .rx()
                .subscribe((isSessionClosed, throwable) -> {
                    if (isSessionClosed != null) {
                        promise.resolve(isSessionClosed);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void selectVirtualKey(String virtualKeyId, Promise promise) {
        SelectVirtualKeyRequest requestFromVkID = SelectVirtualKeyRequest.fromVirtualKeyId(virtualKeyId);

        Disposable disposable = KAAS.shared.selectVirtualKey(requestFromVkID)
                .rx()
                .subscribe((virtualKey, throwable) -> {
                    if (virtualKey != null) {
                        promise.resolve(virtualKey);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void getSelectedVirtualKey(Promise promise) {
        Disposable disposable = KAAS.shared.getSelectedVirtualKey()
                .rx()
                .subscribe((virtualKey, throwable) -> {
                    if (virtualKey != null) {
                        promise.resolve(virtualKey);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void getVirtualKeys(Promise promise) {
        Disposable disposable = KAAS.shared.getVirtualKeys()
                .rx()
                .subscribe(promise::resolve, promise::reject);
    }

    @ReactMethod
    public void scan(int timeout, Promise promise) {
        Disposable disposable = KAAS.shared.scan(timeout)
                .rx()
                .subscribe((scanResult, throwable) -> {
                    if (scanResult != null) {
                        promise.resolve(scanResult);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void connect(int timeout, boolean disableTimeSync, Promise promise) {
        Disposable disposable = KAAS.shared.connect(timeout, disableTimeSync)
                .rx()
                .subscribe(promise::resolve, promise::reject);
    }

    @ReactMethod
    public void disconnect(Promise promise) {
        Disposable disposable = KAAS.shared.disconnect()
                .rx()
                .subscribe((isDisconnected, throwable) -> {
                    if (isDisconnected != null) {
                        promise.resolve(isDisconnected);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void isConnected(Promise promise) {
        Disposable disposable = KAAS.shared.isConnected()
                .rx()
                .subscribe((isConnected, throwable) -> {
                    if (isConnected != null) {
                        promise.resolve(isConnected);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void sendCommand(int command, Promise promise) {
        Disposable disposable = KAAS.shared.sendCommand(Command.UNLOCK)
                .reactivex()
                .subscribe((commandResult, throwable) -> {
                    if (commandResult != null) {
                        promise.resolve(commandResult);
                    } else {
                        promise.reject(throwable);
                    }
                });
    }

    @ReactMethod
    public void bluetoothStateChanged(boolean subscribe) {
        if (disposableBluetoothStateChange == null && subscribe) {
            disposableBluetoothStateChange = KAAS.shared.bluetoothStateChanged()
                    .rx()
                    .subscribe(bluetoothState -> {
                        WritableMap params = Arguments.createMap();
                        params.putString("BLUETOOTH_STATE", bluetoothState.toString());
                        sendEvent(BLUETOOTH_STATE_EVENT, params);
                    }, throwable -> {
                        // An error occured during the stream
                        // TODO
                    });
        } else if (disposableBluetoothStateChange != null && !subscribe) {
            disposableBluetoothStateChange.dispose();
            disposableBluetoothStateChange = null;
        }
    }

    @ReactMethod
    public void connectionStateChanged(boolean subscribe) {
        if (disposableConnectionStateChange == null && subscribe) {
            disposableConnectionStateChange = KAAS.shared.connectionStateChanged()
                    .rx()
                    .subscribe(connectionState -> {
                        WritableMap params = Arguments.createMap();
                        params.putString("CONNECTION_STATE", connectionState.toString());
                        sendEvent(CONNECTION_STATE_EVENT, params);
                    }, throwable -> {
                        // An error occured during the stream
                        // TODO
                    });
        } else if (disposableConnectionStateChange != null && !subscribe) {
            disposableConnectionStateChange.dispose();
            disposableConnectionStateChange = null;
        }
    }

    @ReactMethod
    public void addListener(String eventName) { }
    @ReactMethod
    public void removeListeners(String eventName) { }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

}
