import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {formatToLocalTime} from '../../repository/api/ApiWeather';

const DetailForecastCity = ({
  weather: {sunrise, sunset, temp, details, timezone},
}) => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.txtTempBig]}>{`${temp.toFixed()}`}</Text>
        <View style={styles.visitble}>
          <Text style={{fontSize: 30}}>°C</Text>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{`${details}`}</Text>
        </View>
        <View style={[styles.visitble, {position: 'absolute', right: 25}]}>
          <Text style={{fontSize: 16, marginTop: 5}}>
            <Feather name="sunrise" size={20} />
            {} {formatToLocalTime(sunrise, timezone, 'h:mm a')}
          </Text>
          <Text style={{fontSize: 16, marginTop: 15}}>
            <Feather name="sunset" size={20} />
            {} {formatToLocalTime(sunset, timezone, 'h:mm a')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DetailForecastCity;

const styles = StyleSheet.create({
  imgIcon: {
    width: 110,
    height: 110,
  },
  txtTempBig: {
    fontSize: 70,
    marginLeft: 25,
  },
  visitble: {
    marginTop: 13,
    marginLeft: 8,
  },
});
