package com.glenndoman;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.bridge.NavigationReactPackage;

import net.no_mad.tts.TextToSpeechPackage;

import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;

public class MainApplication extends NavigationApplication {

       @Override
     public boolean isDebug() {
         return BuildConfig.DEBUG;
     }

     protected List<ReactPackage> getPackages() {
         return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new TextToSpeechPackage(),
                new NavigationReactPackage(),
                new VectorIconsPackage(),
                new RealmReactPackage()
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
}
