# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

 # Add any project specific keep options here:
 
 # SDK classes
 # Keep the core security package from the SDK
 -keep class com.continental.kaas.core.security.core.** { *; }

 #Mandatory below (else no vehicle data):Protect Jackson pattern
 -keepclassmembers class ** extends com.fasterxml.jackson.databind.ser.std.** {
 public <init>(...);
 }
 -keepclassmembers class ** extends com.fasterxml.jackson.databind.deser.std.** {
 public <init>(...);
 }
 -keepclassmembers class * {
 @com.fasterxml.jackson.annotation.JsonProperty <methods>;
 @com.fasterxml.jackson.annotation.JsonProperty <fields>;
 }