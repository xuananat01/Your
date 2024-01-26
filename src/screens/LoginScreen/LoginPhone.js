import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';

const LoginPhone = () => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const getOTP = useCallback(async () => {
    try {
      const data = await auth().signInWithPhoneNumber(`+84${phone}`, true);
      setConfirm(data);
    } catch (err) {
      console.log(err);
    }
  }, [phone]);

  const confirmOTP = useCallback(async () => {
    try {
      const res = await confirm.confirm(code);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [confirm, setCode]);

  return (
    <View style={styles.phoneNumber}>
      <TextInput
        aria-label="Phone Number"
        maxLength={10}
        onChangeText={setPhone}
        value={phone}
        keyboardType="phone-pad"
      />
      {confirm ? <TextInput style={{marginTop: 2}} aria-label="OTP" onChangeText={setCode} /> : null}
      <TouchableOpacity onPress={confirm ? confirmOTP : getOTP}>
        {confirm ? <Text>Confirm OTP</Text> : <Text>Get OTP</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default LoginPhone;

const styles = StyleSheet.create({
  phoneNumber: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
