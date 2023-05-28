package com.ffs;

import androidx.annotation.NonNull;

import com.continental.kaas.logging.Logger;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CustomLogger implements Logger {

    private ReactContext mReactContext;

    public CustomLogger(ReactContext reactContext) {
        mReactContext = reactContext;
    }

    @Override
    public void d(final String tag, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void d(final String tag, final Throwable t, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void d(final String tag, final Throwable t) {
        // tag                          --> tag
        // t.getMessage()               --> Throwable message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT,t.getMessage());
    }

    @Override
    public void e(final String tag, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void e(final String tag, final Throwable t, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void e(final String tag, final Throwable t) {
        // tag                          --> tag
        // t.getMessage()               --> Throwable message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, t.getMessage());
    }

    @Override
    public void i(final String tag, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void i(final String tag, final Throwable t, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void i(final String tag, final Throwable t) {
        // tag                          --> tag
        // t.getMessage()               --> Throwable message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, t.getMessage());
    }

    @Override
    public void v(final String tag, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void v(final String tag, final Throwable t, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void v(final String tag, final Throwable t) {
        // tag                          --> tag
        // t.getMessage()               --> Throwable message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, t.getMessage());
    }

    @Override
    public void w(final String tag, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void w(final String tag, final Throwable t, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void w(final String tag, final Throwable t) {
        // tag                          --> tag
        // t.getMessage()               --> Throwable message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, t.getMessage());
    }

    @Override
    public void wtf(final String tag, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void wtf(final String tag, final Throwable t, @NonNull final String message, final Object... args) {
        // tag                          --> tag
        // String.format(message, args) --> log message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, String.format(message, args));
    }

    @Override
    public void wtf(final String tag, final Throwable t) {
        // tag                          --> tag
        // t.getMessage()               --> Throwable message
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(KaaSModule.LOG_EVENT, t.getMessage());
    }

}