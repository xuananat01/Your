import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Ionic from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const CityLocation = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('WeatherScreen')}>
        <Ionic name="arrow-back" size={26} style={styles.iconBack} />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lý thành phố</Text>
      <TouchableOpacity>
        <Ionic name="ellipsis-vertical" size={22} style={styles.iconSetting} />
      </TouchableOpacity>
    </View>
  );
};

export default CityLocation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width,
  },
  iconBack: {
    position: 'absolute',
    color: 'black',
    margin: 25,
  },
  title: {
    position: 'absolute',
    color: 'black',
    left: 65,
    top: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconSetting: {
    position: 'absolute',
    color: 'black',
    right: 20,
    top: 25,
  },
  locationCityName: {
    fontSize: 32,
    marginTop: 80,
    marginLeft: 25,
  },
});
