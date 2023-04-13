import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Location = () => {
  //getcurrent state
  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const [locationStatus, setLocationStatus] = useState('');
  // const [location, setLocation] = useState(false);

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('result: ', granted);

      if (granted === true) {
      } else if (granted === false) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === 'never_ask_again') {
        } else if (status === 'denied') {
          checkPermission();
        } else if (status === 'granted') {
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  //get current location
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  };
  //permission
  useEffect(() => {
    setTimeout(() => {
      checkPermission();
    }, 1000);
  }, []);
  return (
    <View>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <TouchableOpacity onPress={getLocation}>
          <Text>getLocation</Text>
        </TouchableOpacity>
      </View>
      <Text>Latitude: {currentLatitude}</Text>
      <Text>Longitude: {currentLongitude}</Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({});
