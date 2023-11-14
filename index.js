/**
 * @format
 */
import {AppRegistry,LogBox} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import { store } from '@redux/store';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

if (__DEV__) {
  LogBox.ignoreAllLogs();
}

AppRegistry.registerComponent(appName, () => Root);
