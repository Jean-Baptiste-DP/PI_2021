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

   private int[][] reference = new int[320][240];
   private int seuilPixel = 100;
   private int nbPixels = 200;

   ImageAnalyser(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "ImageAnalyser";
   }

   private int binaireToInt(int[] binaire){
        int n = binaire.length;
        int somme = 0;
        int puissanceDe2 = 1;
        for (int i = 0; i<n; i++){
            somme+= binaire[n-i-1]* puissanceDe2;
            puissanceDe2 *= 2;
        }
        return somme;
   }

   private char intToChar (int valeur){
        char[] alphabet = {' ','.','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k',
        'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L',
        'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
        if (valeur<0 || valeur>=64){
            return '.';
        }
        else{
            return alphabet[valeur];
        }
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
        int[] texteBinaire= new int[n];
        //WritableNativeArray texteBinaire = new WritableNativeArray();
        for (int i=0; i<n; i++){
            texteBinaire[i]=analyseImage(listeUri.getString(i));
            //texteBinaire.pushInt(analyseImage(listeUri.getString(i)));
        }
        String mot = texteBiToString(texteBinaire);
        reference[0][0]=0;
        promise.resolve(mot);
   }

   private String texteBiToString(int[] texteBinaire){
        int n = texteBinaire.length;
        int debutMessage = 0;
        while (debutMessage<n-1 && texteBinaire[debutMessage]==0){
            debutMessage++;
        }
        debutMessage++;
        double nbCaractereFloat = (n-debutMessage)/6 + 0.01;
        int nbCaractere = (int) nbCaractereFloat;

        char[] lettres = new char[nbCaractere];

        for (int i = 0; i<nbCaractere; i++){
            int[] caractereBin = {texteBinaire[debutMessage+ 6*i], texteBinaire[debutMessage+ 6*i+1],texteBinaire[debutMessage+ 6*i+2],
            texteBinaire[debutMessage+ 6*i+3],texteBinaire[debutMessage+ 6*i+4],texteBinaire[debutMessage+ 6*i+5]};
            lettres[i]=intToChar(binaireToInt(caractereBin));
        }
        String mot = new String(lettres);
        return mot;
   }

   @ReactMethod
   public void test(final Promise promise){
        int[] binaire1 = {0,0,1,0,1,0};
        int[] binaire2 = {0,0,0,0,0,0};
        char[] lettres = {intToChar(binaireToInt(binaire1)),intToChar(binaireToInt(binaire2)),intToChar(binaireToInt(binaire1))};
        String mot = new String(lettres);
        promise.resolve(mot);
   }
}
