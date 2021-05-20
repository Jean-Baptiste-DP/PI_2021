package com.projet2; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

import android.util.Log;

public class ImageAnalyser extends ReactContextBaseJavaModule {
   ImageAnalyser(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "ImageAnalyser";
   }

   @ReactMethod
   public void triple(String mot, final Promise promise) {
      String tri="test : " + mot;
      promise.resolve(tri);
   }
}
