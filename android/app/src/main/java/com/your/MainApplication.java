package com.your;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import org.reactnative.camera.RNCameraPackage;
import com.microsoft.codepush.react.CodePush;
// import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
// import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
// import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new RNCameraPackage());
          // packages.add(new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)));
          // packages.add(new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)));
          // packages.add(new AppCenterReactNativePackage(MainApplication.this));
          return packages;
        }

         @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
