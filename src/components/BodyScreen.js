import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BodyScreen = ({weather: {dt, name, tinezone, country}}) => {
  return (
    <View style={{backgroundColor: 'pink'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.temperatureTitle}>32</Text>
        <View style={{flexDirection: 'column', marginTop: 96, marginLeft: 15}}>
          <Text style={{fontSize: 28}}>°C</Text>
          <Text style={{fontSize: 26}}>Nhiều mây</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 25}}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>4 thg 4 Thứ 3 </Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}> 32°C / 23°C</Text>
      </View>
    </View>
  );
};

export default BodyScreen;

const styles = StyleSheet.create({
  temperatureTitle: {
    fontSize: 80,
    marginTop: 80,
    marginLeft: 25,
  },
});
