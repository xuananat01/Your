/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from '@redux/store';


const Root = () => {
  return (
      <Provider Provider store={store}>
        <App />
      </Provider>
  );
};

if (__DEV__) {
  LogBox.ignoreAllLogs();
}

AppRegistry.registerComponent(appName, () => Root);
