import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Ionic from 'react-native-vector-icons/Ionicons';
import {actionCityNameAdd} from '../redux/action/addCity-action';
import Permision from './Permision';
const {width, height} = Dimensions.get('window');

const CityLocation = ({navigation}) => {
  const [inputText, setInputText] = useState('');

  //create new state
  const stringCityName = useSelector(state => state.addCityReducer.arr);
  const dispatch = useDispatch();

  //send value input
  const sendValues = useCallback(() => {
    dispatch(actionCityNameAdd(inputText));
    setInputText('');
  }, [dispatch, inputText]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack('weatherScreen')}>
        <Ionic name="arrow-back" size={26} style={styles.iconBack} />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lý thành phố</Text>
      <TouchableOpacity>
        <Ionic name="ellipsis-vertical" size={22} style={styles.iconSetting} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.findCity}
          placeholder="Search city"
          value={inputText}
          onChangeText={newValue => setInputText(newValue)}
        />
        <TouchableOpacity style={styles.tobSearch} onPress={sendValues}>
          <Text style={{fontSize: 20}}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vwCity}>
        {stringCityName.length > 0 &&
          stringCityName.map((item, index) => {
            return (
              <LinearGradient
                colors={['#e6f4f7', '#cde9ee', '#b3dfe6']}
                style={styles.linear}
                key={index}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() =>
                    navigation.navigate({
                      name: 'weatherScreen',
                      paramsKey: item,
                    })
                  }>
                  <Text style={styles.txtInfoweather}>{item}</Text>
                  {/* <Text style={styles.tempweather}>{data.temp.toFixed()}</Text>
                  <Text style={styles.description}>{data.description}</Text> */}
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
      </View>
      <Permision />
    </View>
  );
};

export default CityLocation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 30,
    flex: 1,
  },
  iconBack: {
    position: 'absolute',
    color: 'black',
    margin: 25,
  },
  title: {
    position: 'absolute',
    color: 'black',
    left: 65,
    top: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconSetting: {
    position: 'absolute',
    color: 'black',
    right: 20,
    top: 25,
  },
  findCity: {
    fontSize: 14,
    marginTop: 80,
    height: 40,
    marginLeft: 25,
    paddingLeft: 15,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 1,
    position: 'absolute',
    width: '60%',
  },
  tobSearch: {
    position: 'absolute',
    right: 45,
    marginTop: 88,
  },
  vwCity: {
    position: 'absolute',
    top: 130,
    width: '86%',
    marginHorizontal: '7%',
  },
  txtInfoweather: {
    padding: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  tempweather: {
    fontSize: 22,
    position: 'absolute',
    top: 15,
    right: 60,
    color: '#566e72',
  },
  description: {
    fontSize: 16,
    position: 'absolute',
    top: 50,
    right: 50,
    color: '#566e72',
  },
  linear: {
    height: 90,
    marginTop: 20,
    borderRadius: 20,
  },
});
