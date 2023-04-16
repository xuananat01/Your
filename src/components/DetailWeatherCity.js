import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailWeatherCity = ({
  weather: {feels_like, humidity, speed, pressure},
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Weather</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{position: 'relative', left: 10, top: 20}}>
          <View style={styles.vwBox}>
            <Text style={styles.detailsTitle}>Real Feel</Text>
            <Text
              style={
                styles.detailsForecast
              }>{`${feels_like.toFixed()}°C`}</Text>
          </View>
          <View style={styles.vwBox}>
            <Text style={styles.detailsTitle}>Humidity</Text>
            <Text
              style={styles.detailsForecast}>{`${humidity.toFixed()}%`}</Text>
          </View>
        </View>
        <View style={{position: 'absolute', right: 10, top: 20}}>
          <View style={styles.vwBox}>
            <Text style={styles.detailsTitle}>Speed Cloud</Text>
            <Text
              style={styles.detailsForecast}>{`${speed.toFixed()} km/h`}</Text>
          </View>
          <View style={styles.vwBox}>
            <Text style={styles.detailsTitle}>Atmospheric pressure</Text>
            <Text style={styles.detailsForecast}>{`${pressure.toFixed(
              0,
            )}hPa`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailWeatherCity;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    paddingBottom: 50,
  },
  title: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold',
  },
  detailsForecast: {
    fontSize: 28,
  },
  detailsTitle: {
    fontSize: 14,
    color: 'grey',
  },
  vwBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
});
