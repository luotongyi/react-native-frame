/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  PushNotificationIOS,
  Alert
} from 'react-native';
import { Provider } from 'mobx-react';

import stores from './app/stores';
import './app/storage'
import NavigationRouter from './app/base/navigationRouter'

export default class App extends Component<{}> {
  componentDidMount() {
    //把桌面icon的badgeNumber设置为0
    PushNotificationIOS.setApplicationIconBadgeNumber(0);

    PushNotificationIOS.addEventListener('register', this._onRegistered);
    PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);

    PushNotificationIOS.requestPermissions();
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', this._onRegistered);
    PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
  }

  _onRegistered(deviceToken) {
    Alert.alert(
      'Registered For Remote Push',
      `Device Token: ${deviceToken}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onRegistrationError(error) {
    // Alert.alert(
    //   'Failed To Register For Remote Push',
    //   `Error (${error.code}): ${error.message}`,
    //   [{
    //     text: 'Dismiss',
    //     onPress: null,
    //   }]
    // );
  }

  _onRemoteNotification(notification) {
    const result = `Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()}.`;

    Alert.alert(
      'Push Notification Received',
      result,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification) {
    Alert.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
  render() {
    return (
      <Provider {...stores}>
        <NavigationRouter />
      </Provider>
    );
  }
}
