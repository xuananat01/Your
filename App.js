import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import LoginPhone from '@screens/LoginScreen/LoginPhone';
import CodePush from 'react-native-code-push';
import CalendarScreen from '@screens/Calendar/CalendarScreen';

const Stack = createNativeStackNavigator();

let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'a new update is available!',
  },
};

const App = () => {
  const accessToken = useSelector(state => state.authReducer.accessToken);

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
          {accessToken ? (
            <>
              <Stack.Screen name="weatherScreen" component={WeatherScreen} />
              <Stack.Screen name="locationScreen" component={CityLocation} />
              <Stack.Screen name="registerScreen" component={RegisterScreen} />
              <Stack.Screen name="usingCamera" component={UsingCamera} />
              <Stack.Screen name="usingScanner" component={UsingScanner} />
              <Stack.Screen name="changeLanguage" component={ChangeLanguage} />
              <Stack.Screen name="loginScreen" component={LoginScreen} />
              <Stack.Screen name="loginPhone" component={LoginPhone} />
              <Stack.Screen name='calendarScreen' component={CalendarScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="weatherScreen" component={WeatherScreen} />
              <Stack.Screen name="loginScreen" component={LoginScreen} />
              <Stack.Screen name="locationScreen" component={CityLocation} />
              <Stack.Screen name="registerScreen" component={RegisterScreen} />
              <Stack.Screen name="usingCamera" component={UsingCamera} />
              <Stack.Screen name="usingScanner" component={UsingScanner} />
              <Stack.Screen name="changeLanguage" component={ChangeLanguage} />
              <Stack.Screen name="loginPhone" component={LoginPhone} />
              <Stack.Screen name='calendarScreen' component={CalendarScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LocalizationProvider>
  );
};

export default CodePush(CodePushOptions)(App);

const styles = StyleSheet.create({});
