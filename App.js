import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import WeatherScreen from './src/screens/WeatherScreen/WeatherScreen';
import CityLocation from './src/location/CityLocation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="weatherScreen" component={WeatherScreen} />
        <Stack.Screen name="locationScreen" component={CityLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
