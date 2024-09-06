// import notifee, {EventType} from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import {PERMISSIONS, request} from 'react-native-permissions';
// //method was called to get FCM tiken for notification
// export const getFcmToken = async () => {
//   let token = null;
//   await checkApplicationNotificationPermission();
//   await registerAppWithFCM();
//   try {
//     token = await messaging().getToken();
//     console.log('getFcmToken-->', token);
//   } catch (error) {
//     console.log('getFcmToken Device Token error ', error);
//   }
//   return token;
// };

// //method was called on  user register with firebase FCM for notification
// export async function registerAppWithFCM() {
//   console.log(
//     // 'registerAppWithFCM status',
//     // messaging().isDeviceRegisteredForRemoteMessages,
//   );
//   if (!messaging().isDeviceRegisteredForRemoteMessages) {
//     await messaging()
//       .registerDeviceForRemoteMessages()
//       .then(status => {
//         console.log('registerDeviceForRemoteMessages status', status);
//       })
//       .catch(error => {
//         console.log('registerDeviceForRemoteMessages error ', error);
//       });
//   }
// }

// //method was called on un register the user from firebase for stoping receiving notifications
// export async function unRegisterAppWithFCM() {
//   console.log(
//     'unRegisterAppWithFCM status',
//     messaging().isDeviceRegisteredForRemoteMessages,
//   );

//   if (messaging().isDeviceRegisteredForRemoteMessages) {
//     await messaging()
//       .unregisterDeviceForRemoteMessages()
//       .then(status => {
//         console.log('unregisterDeviceForRemoteMessages status', status);
//       })
//       .catch(error => {
//         console.log('unregisterDeviceForRemoteMessages error ', error);
//       });
//   }
//   await messaging().deleteToken();
//   console.log(
//     'unRegisterAppWithFCM status',
//     messaging().isDeviceRegisteredForRemoteMessages,
//   );
// }

// // xin quyền
// export const checkApplicationNotificationPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     // console.log('Authorization status:', authStatus);
//   }
//   request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
//     .then(result => {
//       // console.log('POST_NOTIFICATIONS status:', result);
//     })
//     .catch(error => {
//       // console.log('POST_NOTIFICATIONS error ', error);
//     });
// };

// //method was called to listener events from firebase for notification triger
// export function registerListenerWithFCM() {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log('onMessage Received : ', JSON.stringify(remoteMessage));
//     if (
//       remoteMessage?.notification?.title &&
//       remoteMessage?.notification?.body
//     ) {
//       onDisplayNotification(
//         remoteMessage.notification?.title,
//         remoteMessage.notification?.body,
//         remoteMessage?.data,
//       );
//     }
//   });

//   notifee.onBackgroundEvent(async ({ type, detail }) => {
//     const { notification, pressAction } = detail;
  
//     // Check if the user pressed the "Mark as read" action
//     if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//       // Update external API
//       // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
//       //   method: 'POST',
//       // });
//       console.log('notify kill app');
  
//       // Remove the notification
//       await notifee.cancelNotification(notification.id);
//     }
//   });

//   messaging().onNotificationOpenedApp(async remoteMessage => {
//     console.log(
//       'onNotificationOpenedApp Received',
//       JSON.stringify(remoteMessage),
//     );
//     // if (remoteMessage?.data?.clickAction) {
//     //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
//     // }
//   });
//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//   return unsubscribe;
// }

// //method was called to display notification
// async function onDisplayNotification(title, body, data) {
//   console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

//   // Request permissions (required for iOS)
//   await notifee.requestPermission();
//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title: title,
//     body: body,
//     data: data,
//     android: {
//       channelId,
//       // pressAction is needed if you want the notification to open the app when pressed
//       pressAction: {
//         id: 'default',
//       },
//     },
//   });
// }

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

export async function getFirebaseToken() {
    return new Promise((handleSuccess, handleError) => {
        messaging()
            .getToken()
            .then(
                (res) => {
                    handleSuccess(res);
                },
                (err) => {
                    handleError(err);
                },
            );
    });
}

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        AsyncStorage.setItem('version_autheStatus1', authStatus.toString());
    }
}

export async function backgroundListenMessage() {
    await messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        //chạy mở app khi kill app
        if (remoteMessage) {
            AsyncStorage.setItem('@version_Key', remoteMessage.data.version);
        } else {
            console.log('no version key');
        }
    });
}

export async function onInitialMessage() {
    //chạy mở app khi kill app
    await messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
            if (remoteMessage) {
                AsyncStorage.setItem(
                    '@save_data_notification',
                    `${JSON.stringify(remoteMessage)}`,
                );
            } else {
                if (__DEV__) {
                    console.log('No data notification');
                }
            }
        });
}

export async function openMessage() {
    /**
     * Mở thông báo từ background
     */
    await messaging().onNotificationOpenedApp(async (remoteMessage) => {
        if (remoteMessage) {
            AsyncStorage.setItem(
                '@save_data_notification',
                `${JSON.stringify(remoteMessage)}`,
            );
        } else {
            if (__DEV__) {
                console.log('No data notification');
            }
        }
    });
}

export async function subscribes() {
    /**
     * Xử lý thông báo nền
     */
    await messaging().onMessage((remoteMessage) => {
        if (remoteMessage) {
            AsyncStorage.setItem('@version_Key', remoteMessage.data.version);
            AsyncStorage.setItem(
                '@build_Number',
                remoteMessage.data.build_number,
            );
        } else {
            console.log('no version key');
        }
    });
}

export async function createChannel() {
    const channel_id = 'channel_push_notification';

    PushNotification.getChannels(function (channel_ids) {
        if (!channel_ids.includes(channel_id)) {
            PushNotification.createChannel(
                {
                    channelId: 'channel_push_notification',
                    channelName: 'Channel push notifition',
                    importance: 4,
                },
                async (created) =>
                    created &&
                    (await AsyncStorage.setItem(
                        'channel_notification',
                        channel_id,
                    )),
            );
        }
    });
}
