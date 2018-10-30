import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = "FlashCards:notification";

function createNotification() {
  return {
    title: 'Make a Quize!',
    body: "👋 don't forget to challenge yourself everyday!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function clearLocalNotification() {
  console.log("Delete notification");
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
  console.log("Try to set notification");
  AsyncStorage.getAllKeys().then(keys => keys.map(key => console.log(key)));
  return AsyncStorage.getAllKeys()
    .then(keys => keys.filter(key => key === NOTIFICATION_KEY))
    .then((machingKeys) => {
      if (machingKeys.length === 0) {
        console.log("Notification has not been set yet");
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(15)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              console.log("Notification has been set");
            }
          })
      }
    })
}