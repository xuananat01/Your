import * as React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {LocalizationContext} from '@context/index';
import { useState, useContext } from 'react';
import moment from 'moment';

const MAP_LANG = {vi: 'Tiếng Việt', en: 'English'};

const ChangeLanguage = ({navigation}) => {
  const {t, locale, setLocale} = useContext(LocalizationContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState()

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setDate(date);
    console.log(date);
    hideDatePicker();
  };

  const _changeLanguage = async item => {
    AsyncStorage.setItem('@locale', item);
    setLocale(item);
    navigation.goBack();
  };
  return (
    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
      {Object.keys(MAP_LANG).map(e => {
        return (
          <TouchableOpacity onPress={() => _changeLanguage(e)} key={e}>
            <View>
              <Text style={styles.title}>{MAP_LANG[e]}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <Button title="showDatePicker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text>{moment(date).format('DD-MM-yyyy')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'blue',
    fontSize: 20,
  },
});

export default ChangeLanguage;
