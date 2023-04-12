import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {formatToLocalTime} from '../api/ApiWeather';

const TimeAndLocation = ({weather: {dt, name, timezone, country}}) => {
  return (
    <View style={styles.temperatureTitle}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', marginLeft: 25}}>
          <Text style={{fontSize: 14}}>{formatToLocalTime(dt, timezone)}</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
            }}>{`${name}, ${country}`}</Text>
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
});
