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

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

public class ImageAnalyser extends ReactContextBaseJavaModule {
   ImageAnalyser(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "ImageAnalyser";
   }

   @ReactMethod
   public void triple(String filePath, final Promise promise) {
      //Bitmap bitmap = BitmapFactory.decodeFile(filePath.substring(7)); //après test, il faut le vrai chemin
      //promise.resolve(bitmap.getWidth());
      promise.resolve(filePath.substring(7));
      //String tri="test : " + mot;
      //promise.resolve(tri);
   }
}
