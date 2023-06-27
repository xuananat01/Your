import React, {useEffect, useState} from 'react';
import {
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
import getFormattedWeatherData from '../../api/ApiWeather';
import DeatilWeatherDaily from '../../components/DeatilWeatherDaily';
import DetailForecastCity from '../../components/DetailForecastCity';
import DetailWeatherCity from '../../components/DetailWeatherCity';
import DetailWeatherHourly from '../../components/DetailWeatherHourly';
import TimeAndLocation from '../../components/TimeAndLocation';
import {setLoading} from '../../redux/action/loading-action';
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
    dispatch(setLoading(true));
    await getFormattedWeatherData({...city, units}).then(res => {
      setData(res), dispatch(setLoading(false)), setRefreshing(false);
    });
  };
  //callApiWeather
  useEffect(() => {
    dispatch(setLoading(true))
    fecthWeather();
    dispatch(setLoading(false))
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
    // AsyncStorage.clear();
    navigation.replace('loginScreen');
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
            <DeatilWeatherDaily items={data.daily} />
            <DetailWeatherCity weather={data} />
          </ScrollView>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'column',
    width,
    marginTop: 30,
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
    top: 23,
  },
  findCity: {
    fontSize: 14,
    marginTop: 80,
    marginHorizontal: 25,
    paddingLeft: 15,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 1,
    height: 40,
    // position: 'relative',
  },
  tobSearch: {
    position: 'absolute',
    right: 45,
    marginTop: 88,
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
  line: {
    height: 1,
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 20,
    backgroundColor: 'black',
  },
});
