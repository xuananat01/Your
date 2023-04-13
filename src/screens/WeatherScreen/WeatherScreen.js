import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FullScreenChz from 'react-native-fullscreen-chz';
import Ionic from 'react-native-vector-icons/Ionicons';
import getFormattedWeatherData from '../../api/ApiWeather';
import DeatilWeatherDaily from '../../components/DeatilWeatherDaily';
import DetailWeatherHourly from '../../components/DetailWeatherHourly';
import TimeAndLocation from '../../components/TimeAndLocation';
import DetailForecastCity from '../../components/DetailForecastCity';

//fullScreen
FullScreenChz.disable();

const {width, height} = Dimensions.get('window');

const WeatherScreen = () => {
  const [city, setCity] = useState({q: 'hanoi'});
  const [units, setUnits] = useState('imperial');
  const [data, setData] = useState();
  const [inputText, setInputText] = useState('');

  //callApiWeather

  // useEffect(() => {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  //   )
  //     .then(res => res.json())
  //     .then(res => setData(res))
  //     .catch(err => console.log('error: ', err));
  // }, [cityname]);

  useEffect(() => {
    const fecthWeather = async () => {
      await getFormattedWeatherData({...city, units}).then(res => setData(res));
    };
    fecthWeather();
  }, [city, units]);

  //handle new location
  function sendValues() {
    // setCity(inputText);
    if (inputText !== '') {
      setCity({q: inputText});
    }
  }

  //getCurrentDate
  const date = new Date();
  const n = date.toDateString();

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity>
          <Ionic
            name="location-outline"
            size={22}
            style={styles.iconLocation}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionic
            name="ellipsis-vertical"
            size={22}
            style={styles.iconSetting}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.findCity}
          placeholder="Search city"
          value={inputText}
          // autoFocus={true}
          onChangeText={newValue => setInputText(newValue)}
        />
        <TouchableOpacity
          style={styles.tobSearch}
          onPress={() => sendValues(inputText)}>
          <Ionic name="search" size={24} />
        </TouchableOpacity>
      </View>
      {data ? (
        <ScrollView>
          <TimeAndLocation weather={data} />
          <DetailForecastCity weather={data} />
          <DetailWeatherHourly items={data.hourly} />
          <Text
            style={{
              height: 1,
              width: '90%',
              marginHorizontal: '5%',
              marginTop: 20,
              backgroundColor: 'black',
            }}
          />
          <DeatilWeatherDaily items={data.daily} />
        </ScrollView>
      ) : null}
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'white',
  },
  containerHeader: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width,
  },
  iconLocation: {
    position: 'absolute',
    color: 'black',
    right: 60,
    top: 25,
  },
  iconSetting: {
    position: 'absolute',
    color: 'black',
    right: 20,
    top: 25,
  },
  findCity: {
    fontSize: 16,
    marginTop: 80,
    marginHorizontal: 25,
    paddingLeft: 15,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 1,
  },
  tobSearch: {
    position: 'absolute',
    right: 45,
    marginTop: 90,
  },
  temperatureTitle: {
    fontSize: 55,
  },
  countryView: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  countryDetail: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
  },
  largeIcon: {
    width: 80,
    height: 80,
  },
});
