
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

export async function sendWalletFoundNotification(address: string, balance: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎉 Wallet with Balance Found!',
      body: `Found wallet ${address.substring(0, 10)}... with ${balance.toFixed(4)} ETH`,
      data: { address, balance },
    },
    trigger: null, // Send immediately
  });
}

export async function sendGenerationStatsNotification(totalGenerated: number, walletsFound: number) {
  if (totalGenerated % 1000 === 0) { // Every 1000 wallets
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Generation Progress',
        body: `Generated ${totalGenerated} wallets. Found ${walletsFound} with balance.`,
        data: { totalGenerated, walletsFound },
      },
      trigger: null,
    });
  }
}
