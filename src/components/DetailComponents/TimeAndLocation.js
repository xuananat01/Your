import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatToLocalTime} from '../../api/ApiWeather';

const TimeAndLocation = ({weather: {dt, name, timezone, country}}) => {
  return (
    <View style={styles.temperatureTitle}>
      <View style={styles.vwTime}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txtTime}>{formatToLocalTime(dt, timezone)}</Text>
        </View>
        <View>
          <Text style={styles.txtCity}>{`${name}, ${country}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimeAndLocation;

const styles = StyleSheet.create({
  temperatureTitle: {
    marginTop: 30,
  },
  vwTime: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTime: {fontSize: 15},
  txtCity: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
