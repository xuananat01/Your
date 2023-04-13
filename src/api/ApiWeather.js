//https://api.openweathermap.org/data/2.5/onecall?lat=21.0245&lon=105.8412&
// units=imperial&exclude=minutely&appid=1fa9ff4126d95b8db54f3897a208e91c
// 07fc803079167325b8ddeaba2a3ab0aa

import {DateTime} from 'luxon';
import {URL, URLSearchParams} from 'react-native-url-polyfill';

export const apiKey = '1fa9ff4126d95b8db54f3897a208e91c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// fetch with cityName by weather
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({...searchParams, appid: apiKey});

  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log('err: ', err));
};

// get data current weather data
const formatCurrentWeather = data => {
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name,
    dt,
    sys: {country, sunrise, sunset},
    weather,
    wind: {speed},
  } = data;

  const {main: details, icon, description} = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    description,
  };
};
//fecth api daily, hourly
const formatForecastWeather = data => {
  let {timezone, daily, hourly} = data;
  //get daily
  daily = daily.slice(1, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  //get hourly
  hourly = hourly.slice(1, 24).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'h:mm a'),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return {timezone, daily, hourly};
};
// get time current
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | 'h:mm a",
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//fetch with weather to get lat, lon
const getFormattedWeatherData = async searchParams => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams,
  ).then(formatCurrentWeather);
  // get lat, lon current
  const {lat, lon} = formattedCurrentWeather;
  //fetch with onecall to get daily, hourly
  const formattedForecastWeather = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current,minutely,alerts',
    units: searchParams.units,
  }).then(formatForecastWeather);

  return {...formattedCurrentWeather, ...formattedForecastWeather};
};
//get icon from http
const iconUrlFromCode = code =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};
