/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider, createStoreHook} from 'react-redux';
import {store} from '@redux/store';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

notifee.onBackgroundEvent(({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      // if (detail?.notification?.data?.clickAction) {
      //   onNotificationClickActionHandling(
      //     detail.notification.data.clickAction
      //   );
      // }
      break;
  }
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return (
    <Provider Provider store={store}>
      <App />
    </Provider>
  );
}

// const Root = () => {
//   return (
//     <Provider Provider store={store}>
//       <App />
//     </Provider>
//   );
// };

if (__DEV__) {
  LogBox.ignoreAllLogs();
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
