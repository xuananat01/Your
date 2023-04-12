import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';

const data = [
  {
    id: 1,
    hour: '14:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 2,
    hour: '15:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 3,
    hour: '16:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 4,
    hour: '17:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 5,
    hour: '18:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 6,
    hour: '18:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 7,
    hour: '18:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
  {
    id: 8,
    hour: '18:00',
    icon: 'partly-sunny-outline',
    temperature: '32',
  },
];

const DetailWeatherHourly = () => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.detailDaily}>
        <Text>{item.hour}</Text>
        <Ionic name={item.icon} size={24} style={styles.icon} />
        <Text style={{fontWeight: 'bold'}}>{item.temperature}°C</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem(item)}
      style={{
        marginLeft: 5,
        marginRight: 10,
        maxHeight: 120,
      }}
      horizontal
    />
  );
};

export default DetailWeatherHourly;

const styles = StyleSheet.create({
  detailDaily: {
    fontSize: 16,
    flexDirection: 'column',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  icon: {
    paddingVertical: 10,
  },
});
