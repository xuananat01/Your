import * as React from 'react';
import * as RNLocalize from 'react-native-localize';
import I18n from 'react-native-i18n';
import vi from '@i18n/vi';
import en from '@i18n/en';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalizationContext} from './index';
import Permission from 'src/pages/location/Permision';
import WeatherScreen from 'src/pages/screens/WeatherScreen/WeatherScreen';
import App from 'App';

I18n.fallbacks = true;
I18n.translations = {vi, en};

export const LocalizationProvider = ({children}) => {
  const [locale, setLocale] = React.useState('vi');

  React.useEffect(() => {
    const setInitialLocale = async () => {
      const currentLanguage = RNLocalize.findBestAvailableLanguage(
        Object.keys({
          vi: vi,
          en: en,
        }),
      );
      const curLocale = await AsyncStorage.getItem('@locale');
      if (curLocale === null) {
        setLocale(currentLanguage?.languageTag || 'vi');
      } else {
        setLocale(curLocale);
      }
    };
    setInitialLocale();
  }, []);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => I18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
        {children}
    </LocalizationContext.Provider>
  );
};
