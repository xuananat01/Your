import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import WeatherScreen from './src/screens/WeatherScreen/WeatherScreen';
import CityLocation from './src/location/CityLocation';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/LoginScreen/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsingCamera from './src/components/UsingCamera';

const Stack = createNativeStackNavigator();

const passKey = AsyncStorage.getItem('token');

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {passKey === null ? (
          <>
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="registerScreen" component={RegisterScreen} />
            <Stack.Screen name="weatherScreen" component={WeatherScreen} />
            <Stack.Screen name="locationScreen" component={CityLocation} />
            <Stack.Screen name="usingCamera" component={UsingCamera} />
          </>
        ) : (
          <>
            <Stack.Screen name="weatherScreen" component={WeatherScreen} />
            <Stack.Screen name="locationScreen" component={CityLocation} />
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="registerScreen" component={RegisterScreen} />
            <Stack.Screen name="usingCamera" component={UsingCamera} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
