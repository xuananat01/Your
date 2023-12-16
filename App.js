import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsingCamera from '@components/UsingCamera';
import UsingScanner from '@components/UsingScanner';
import LoginScreen from '@screens/LoginScreen/LoginScreen';
import RegisterScreen from '@screens/LoginScreen/RegisterScreen';
import WeatherScreen from '@screens/WeatherScreen/WeatherScreen';
import CityLocation from '@location/CityLocation';
import {getFcmToken, registerListenerWithFCM} from '@utils/commonUtils';
import {LocalizationProvider} from '@context/Localization';
import ChangeLanguage from '@components/Setting/ChangeLanguage';

const Stack = createNativeStackNavigator();

const passKey = AsyncStorage.getItem('token');

const App = () => {
  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <LocalizationProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {passKey === null ? (
            <>
              <Stack.Screen name="loginScreen" component={LoginScreen} />
              <Stack.Screen name="registerScreen" component={RegisterScreen} />
              <Stack.Screen name="weatherScreen" component={WeatherScreen} />
              <Stack.Screen name="locationScreen" component={CityLocation} />
              <Stack.Screen name="usingCamera" component={UsingCamera} />
              <Stack.Screen name="usingScanner" component={UsingScanner} />
              <Stack.Screen name="changeLanguage" component={ChangeLanguage} />
            </>
          ) : (
            <>
              <Stack.Screen name="weatherScreen" component={WeatherScreen} />
              <Stack.Screen name="locationScreen" component={CityLocation} />
              <Stack.Screen name="loginScreen" component={LoginScreen} />
              <Stack.Screen name="registerScreen" component={RegisterScreen} />
              <Stack.Screen name="usingCamera" component={UsingCamera} />
              <Stack.Screen name="usingScanner" component={UsingScanner} />
              <Stack.Screen name="changeLanguage" component={ChangeLanguage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LocalizationProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
