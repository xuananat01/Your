import {ScrollView, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {iconUrlFromCode} from '../api/ApiWeather';

const DetailWeatherHourly = ({items}) => {
  // console.log(items);
  return (
    <ScrollView style={styles.detailDaily} horizontal>
      {items.map(item => (
        <View
          style={{
            marginHorizontal: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15}}>{item.title}</Text>
          <Image
            source={{uri: iconUrlFromCode(item.icon)}}
            style={styles.icon}
          />
          <Text style={{fontSize: 15, fontWeight: '500'}}>
            {`${((item.temp - 32) * (5 / 9)).toFixed()}°C`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DetailWeatherHourly;

const styles = StyleSheet.create({
  detailDaily: {
    marginLeft: 15,
    marginTop: 20,
  },
  icon: {
    width: 45,
    height: 45,
  },
});
