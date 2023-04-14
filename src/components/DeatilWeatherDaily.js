import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {iconUrlFromCode} from '../api/ApiWeather';

const DeatilWeatherDaily = ({items}) => {
  return (
    <View style={styles.detailDaily}>
      {items.map((item, i) => (
        <View
          key={i}
          style={{marginLeft: 10, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 15, width: 80}}>{item.title}</Text>
          <View style={{marginLeft: 30}}>
            <Image
              source={{uri: iconUrlFromCode(item.icon)}}
              style={styles.icon}
            />
          </View>
          <Text
            style={{fontSize: 16, width: 70}}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.description}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              position: 'absolute',
              right: 25,
            }}>
            {`${((item.temp_max - 32) * (5 / 9)).toFixed()}`}
            {' / '}
            {`${((item.temp_min - 32) * (5 / 9)).toFixed()}°C`}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default DeatilWeatherDaily;

const styles = StyleSheet.create({
  detailDaily: {
    marginLeft: 15,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
});
