import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
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
  iconCamera: {
    position: 'absolute',
    color: 'black',
    right: 100,
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
  iconBack: {
    position: 'absolute',
    color: 'black',
    margin: 25,
  },
  title: {
    position: 'absolute',
    top: 20,
    width,
    textAlign: 'center',
    fontSize: 22
  },
});
