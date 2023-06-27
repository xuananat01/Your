import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const handleRegisterUser = value => {
    setEmail(value);
  };
  const handleRegisterPass = value => {
    setPass(value);
  };
  const handleOnpressRegister = () => {
    console.log({email, pass});
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/bglocation.jpg')}>
      <TextInput style={styles.inputName} placeholder="Enter Name" />
      <TextInput
        style={styles.inputAccount}
        placeholder="Email or Phone number"
        inputMode="email"
        onChangeText={handleRegisterUser}
        value={email}
      />
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        // secureTextEntry={true}
        onChangeText={handleRegisterPass}
        value={pass}
      />
      <TouchableOpacity
        style={styles.tobRegister}
        activeOpacity={0.8}
        onPress={() => handleOnpressRegister}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('loginScreen')}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.register}>Already have an account? </Text>
        <Text style={[styles.register, {color: 'red'}]}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputName: {
    width: '80%',
    marginTop: '80%',
    height: 45,
    marginHorizontal: '10%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  inputAccount: {
    width: '80%',
    marginTop: 10,
    height: 45,
    marginHorizontal: '10%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 10,
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
  tobRegister: {
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
