package com.ffs;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.continental.kaas.library.KAAS;
import com.continental.kaas.library.exception.NoSelectedVirtualKeyException;
import com.continental.kaas.library.exception.VirtualKeyException;
import com.continental.kaas.library.external.Command;
import com.continental.kaas.library.external.SelectVirtualKeyRequest;
import com.continental.kaas.library.external.SessionResponse;
import com.continental.kaas.library.external.VirtualKey;
import com.continental.kaas.logging.Plop;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.Map;

import io.reactivex.disposables.Disposable;
import io.reactivex.exceptions.CompositeException;

public class KaaSModule extends ReactContextBaseJavaModule {

    private static KaaSModule instance;
    private static CustomLogger customLogger;
    private static String BLUETOOTH_STATE_EVENT = "kaas_bluetooth_state_event";
    private static String CONNECTION_STATE_EVENT = "kaas_connection_state_event";
    private Disposable disposableBluetoothStateChange;
    private Disposable disposableConnectionStateChange;
    private static GsonBuilder gsonBuilder = new GsonBuilder();
    private static Gson gson = gsonBuilder.create();
    private static boolean isInitialised = false;

    public static KaaSModule getInstance(@Nullable ReactApplicationContext reactContext) {
        if (instance == null) {
            instance = new KaaSModule(reactContext);
        }
        return instance;
    }

    private KaaSModule(@Nullable ReactApplicationContext reactContext) {
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
        if (isInitialised) {
            promise.resolve(true);
        } else {
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
                customLogger = new CustomLogger(getReactApplicationContext());
                config.setLogger(new Plop.Tree(Plop.Level.VERBOSE, customLogger, 3));
            }

            KAAS.shared.init(config);
            isInitialised = true;
            promise.resolve(true);
        }
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
                        String JSONObject = gson.toJson(virtualKey);
                        promise.resolve(JSONObject);
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
                        String JSONObject = gson.toJson(virtualKey);
                        promise.resolve(JSONObject);
                    } else {
                        WritableNativeMap writableNativeMap = new WritableNativeMap();
                        if (throwable instanceof CompositeException) {
                            writableNativeMap.putString("error_name", ((CompositeException) throwable).getExceptions().get(((CompositeException) throwable).size()-1).getClass().getSimpleName());
                            writableNativeMap.putString("error_message", ((CompositeException) throwable).getExceptions().get(((CompositeException) throwable).size()-1).getMessage());
                        } else {
                            writableNativeMap.putString("error_name", throwable.getClass().getSimpleName());
                            writableNativeMap.putString("error_message", throwable.getMessage());
                        }
                        promise.reject(throwable, writableNativeMap);
                    }
                });
    }

    @ReactMethod
    public void getVirtualKeys(Promise promise) {
        Disposable disposable = KAAS.shared.getVirtualKeys()
                .rx().subscribe(virtualKeys -> {
                    String JSONObject = gson.toJson(virtualKeys);
                    // Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    // String prettyJson = prettyGson.toJson(crunchify);
                    promise.resolve(JSONObject);
                }, throwable -> {
                    WritableNativeMap writableNativeMap = new WritableNativeMap();
                    writableNativeMap.putString("error_name", throwable.getClass().getSimpleName());
                    writableNativeMap.putString("error_message", throwable.getMessage());
                    promise.reject(throwable, writableNativeMap);
                });
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
                .subscribe(connectionResult -> promise.resolve(connectionResult.isSuccessful()), throwable -> {
                    WritableNativeMap writableNativeMap = new WritableNativeMap();
                    writableNativeMap.putString("error_name", throwable.getClass().getSimpleName());
                    writableNativeMap.putString("error_message", throwable.getMessage());
                    promise.reject(throwable, writableNativeMap);
                });
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
