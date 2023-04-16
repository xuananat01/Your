import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {iconUrlFromCode} from '../api/ApiWeather';

const {width, height} = Dimensions.get('window');

const DetailWeatherHourly = ({items}) => {
  // console.log(items);
  return (
    <ScrollView style={styles.detailHourly} horizontal>
      {items.map((item, i) => (
        <View
          key={i}
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
            {`${item.temp.toFixed()}°C`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DetailWeatherHourly;

const styles = StyleSheet.create({
  detailHourly: {
    marginLeft: 15,
    marginTop: 20,
  },
  icon: {
    width: 45,
    height: 45,
  },
});
