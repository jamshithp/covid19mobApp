import React from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';

export default class AppContainer extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
    updates:[],
    sendNotification:true,
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      //console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentDidUpdate(){
    this.state.sendNotification && this.getupdate();
  }

   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
   sendPushNotification = async (updates) => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: updates,
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    this.setState({sendNotification:false})
  };

  getupdate = () => {
    axios
    .get('https://api.covid19india.org/updatelog/log.json')
    .then((response) => {
      const updates = response.data.map(activity=> {
        activity.update = activity.update.split('\n');
        return activity;
      });
      sendPushNotification(updates[0]);
      
    })
    .catch((err) => {
      console.log(err);
    });
  };

  _handleNotification = notification => {
    Vibration.vibrate();
    this.setState({ notification: notification });
  };

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
        <View>
      </View>
    );
  }
}