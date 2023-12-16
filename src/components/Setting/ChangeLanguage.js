import * as React from 'react';
import {Text, StyleSheet, View,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LocalizationContext} from '@context/index';

const MAP_LANG = {vi: 'Tiếng Việt', en: 'English'};

const ChangeLanguage = ({navigation}) => {
  const {t, locale, setLocale} = React.useContext(LocalizationContext);

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
