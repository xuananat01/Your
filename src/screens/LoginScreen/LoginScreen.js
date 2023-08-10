import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Permision from '../../location/Permision';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tk, setTk] = useState('');
  const [mk, setMk] = useState('');

  //get username, password to inputText
  const handleOnchangeUser = value => {
    setUsername(value);
    AsyncStorage.setItem('user', username);
  };
  const handleOnchangePass = value => {
    setPassword(value);
    AsyncStorage.setItem('pass', password);
  };
  const handleOnpressLogin = () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert('Please input login infomation');
      return;
    }
    //api login
    axios({
      url: 'https://reqres.in/api/login',
      method: 'POST',
      data: {
        email: username,
        password: password,
      },
    })
      .then(res => {
        AsyncStorage.setItem('token', res.data.token);
        navigation.navigate('weatherScreen');
      })
      .catch(error => Alert.alert(error.response.data.error));
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/bglocation.jpg')}>
      <Text style={styles.title}>Forecast Weather App</Text>
      <TextInput
        style={styles.inputAccount}
        placeholder="Email or Phone number"
        inputMode="email"
        onChangeText={handleOnchangeUser}
        value={username}
      />
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        // secureTextEntry={true}
        onChangeText={handleOnchangePass}
        value={password}
      />
      <TouchableOpacity
        style={styles.tobLogin}
        activeOpacity={0.8}
        onPress={() => handleOnpressLogin(username, password)}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('registerScreen')}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.register}>Don't have an account? </Text>
        <Text style={[styles.register, {color: 'red'}]}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.textRegister}>────────────────</Text>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '60%',
  },
  inputAccount: {
    width: '80%',
    height: 45,
    marginTop: 60,
    marginHorizontal: '10%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  notiAccount: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: '10%',
    marginTop: 5,
  },
  inputPassword: {
    width: '80%',
    height: 45,
    marginHorizontal: '10%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 10,
  },
  notiPassword: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: '10%',
    marginVertical: 5,
  },
  tobLogin: {
    width: '60%',
    marginHorizontal: '20%',
    backgroundColor: '#e4f2f7',
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 4,
  },
  register: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 15,
  },
  textRegister: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
