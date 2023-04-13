import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {formatToLocalTime} from '../api/ApiWeather';

const DetailForecastCity = ({
  weather: {
    icon,
    sunrise,
    sunset,
    temp,
    details,
    temp_max,
    temp_min,
    humidity,
    speed,
    timezone,
    description,
    feels_like,
  },
}) => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.txtTempBig]}>{`${(
          (temp - 32) *
          (5 / 9)
        ).toFixed()}`}</Text>
        <View style={styles.visitble}>
          <Text style={{fontSize: 30}}>°C</Text>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{`${details}`}</Text>
        </View>
        <View style={[styles.visitble, {position: 'absolute', right: 25}]}>
          <Text style={{fontSize: 16}}>
            Hight: {`${((temp_max - 32) * (5 / 9)).toFixed()}°C`}
          </Text>
          <Text style={{fontSize: 16}}>
            Low: {`${((temp_min - 32) * (5 / 9)).toFixed()}°C`}
          </Text>
          {/* <Text style={styles.detailsForecast}>
            <Feather name="thermometer" size={22} />
            Real Fell: {`${((feels_like - 32) * (5 / 9)).toFixed()}°C`}
          </Text>
          <Text style={styles.detailsForecast}>{`${humidity.toFixed()}%`}</Text>
          <Text style={styles.detailsForecast}>
            {`${speed.toFixed()} km/h`}
          </Text> */}
        </View>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 25}}>
        <Text style={{fontSize: 16}}>
          <Feather name="sunrise" size={22} />
          {} {formatToLocalTime(sunrise, timezone, 'h:mm a')}
        </Text>
        <Text style={{fontSize: 16, marginLeft: 15}}>
          <Feather name="sunset" size={22} />
          {} {formatToLocalTime(sunset, timezone, 'h:mm a')}
        </Text>
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
  detailsForecast: {
    fontSize: 15,
    fontWeight: '500',
  },
  visitble: {
    marginTop: 13,
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
});
