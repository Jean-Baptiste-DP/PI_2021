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
import android.graphics.Color;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.ReadableArray;

public class ImageAnalyser extends ReactContextBaseJavaModule {

   private int[][] reference = new int[288][216];
   private int seuilPixel = 100;
   private int nbPixels = 200;

   ImageAnalyser(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "ImageAnalyser";
   }

   private int[][] toBlackAndWhite (Bitmap bitmap){
      int width = bitmap.getWidth();
      int height = bitmap.getHeight();
      int[][] pixels = new int[width][height];

      for (int x = 0; x < width; x++) {
              for (int y = 0; y < height; y++) {
                int color = bitmap.getPixel(x, y);
                float decimal = (Color.red(color)+Color.blue(color)+Color.green(color))/3;
                pixels[x][y]=(int)decimal;
              }
      }
      return pixels;
   }

   private void setReference(String fileUri) {
      Bitmap bitmap = BitmapFactory.decodeFile(fileUri.substring(7));
      reference = toBlackAndWhite(bitmap);
      if (reference[0][0]==0){
        reference[0][0]=1;
      }
   }

   private int analyseImage(String fileUri) {
      if (reference[0][0]==0){
           setReference(fileUri);
           return 0;
      }
      else {
           Bitmap bitmap = BitmapFactory.decodeFile(fileUri.substring(7));
           int[][] bAWImage = toBlackAndWhite(bitmap);
           int width = bitmap.getWidth();
           int height = bitmap.getHeight();
           int somme = 0;

           for(int x=0; x<width; x++){
                for(int y=0; y<height; y++){
                    if( reference[x][y] - bAWImage[x][y] > seuilPixel || bAWImage[x][y] - reference[x][y] > seuilPixel){
                        somme++;
                    }
                }
           }
           if (somme > nbPixels){
                return 1;
           }
           else{
                return 0;
           }
      }
   }

   @ReactMethod
   public void analyseListe(ReadableArray listeUri, final Promise promise){
        int n = listeUri.size();
        //int[] texteBinaire= new int[n];
        WritableNativeArray texteBinaire = new WritableNativeArray();
        for (int i=0; i<n; i++){
            //texteBinaire[i]=analyseImage(listeUri.getString(i));
            texteBinaire.pushInt(analyseImage(listeUri.getString(i)));
        }
        promise.resolve(texteBinaire);
   }
}
