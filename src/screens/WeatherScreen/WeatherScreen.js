import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FullScreenChz from 'react-native-fullscreen-chz';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import messaging from '@react-native-firebase/messaging';
import getFormattedWeatherData from 'src/api/ApiWeather';
import {setLoading} from '@redux/action/loading-action';
import TimeAndLocation from '@components/DetailComponents/TimeAndLocation';
import DetailForecastCity from '@components/DetailComponents/DetailForecastCity';
import DetailWeatherHourly from '@components/DetailComponents/DetailWeatherHourly';
import DetailWeatherCity from '@components/DetailComponents/DetailWeatherCity';
import {
  getToken,
  notificationListener,
  requestUserPermission,
} from '@utils/commonUtils';
import DetailWeatherDaily from '@components/DetailComponents/DetailWeatherDaily';
import {LocalizationContext} from '@context/index';
//fullScreen
FullScreenChz.enable();

const {width, height} = Dimensions.get('window');

const WeatherScreen = ({navigation, route}) => {
  const [city, setCity] = useState({q: 'hanoi'});
  const [units, setUnits] = useState('metric');
  const [data, setData] = useState();
  const [inputText, setInputText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const fecthWeather = async () => {
    await getFormattedWeatherData({...city, units}).then(res => {
      setData(res), dispatch(setLoading(false)), setRefreshing(false);
    });
  };
  //callApiWeather
  useEffect(() => {
    dispatch(setLoading(true));
    fecthWeather();
    dispatch(setLoading(false));
  }, [city, units]);

  //handle new location
  function sendValues() {
    // setCity(inputText);
    if (inputText !== '') {
      setCity({q: inputText});
      setInputText('');
    }
  }
  //handle Logout
  const handleLogout = () => {
    navigation.replace('loginScreen');
    AsyncStorage.removeItem('accessToken');
    // navigation.navigate('changeLanguage')
  };

  const handleCamera = () => {
    navigation.navigate('usingCamera');
  };

  //getCurrentDate
  const date = new Date();
  const n = date.toDateString();

  //load refresh
  const RefreshOrder = () => {
    setRefreshing(true);
    setLoading(true);
    fecthWeather();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('locationScreen')}>
            <Ionic
              name="location-outline"
              size={22}
              style={styles.iconLocation}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Ionic
              name="log-out-outline"
              size={26}
              style={styles.iconSetting}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCamera}>
            <Ionic name="camera-outline" size={26} style={styles.iconCamera} />
          </TouchableOpacity>
          <TextInput
            style={styles.findCity}
            placeholder="Search city"
            value={inputText}
            onChangeText={newValue => setInputText(newValue)}
          />
          <TouchableOpacity
            style={styles.tobSearch}
            onPress={() => sendValues(inputText)}>
            <Ionic name="search" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              color: 'black',
              right: 145,
              top: 23,
            }}
            onPress={() => navigation.navigate('changeLanguage')}>
            <Ionic name="camera" size={22} />
          </TouchableOpacity>
        </View>
        {data ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={RefreshOrder}
                // colors='#C3002F'
              />
            }>
            <TimeAndLocation weather={data} />
            <DetailForecastCity weather={data} />
            <DetailWeatherHourly items={data.hourly} />
            <Text style={styles.line} />
            <DetailWeatherDaily items={data.daily} />
            <DetailWeatherCity weather={data} />
          </ScrollView>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default WeatherScreen;
