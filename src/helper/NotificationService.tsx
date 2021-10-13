import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFmcToken()
  }
}

const getFmcToken = async()=>{
    try{
        const fmcToken = await messaging().getToken()
        console.log('============fmcToken========================');
        console.log(fmcToken);
        console.log('=============fmcToken=======================');
        global.token=fmcToken
    }
    catch (err){
        console.log(err);
    }
}

export const notificationListener = async ()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log( 'Notification caused app to open from background state:', remoteMessage.notification );
    });
    messaging().getInitialNotification().then(remoteMessage => {
      console.log(remoteMessage);
          if (remoteMessage) {
            console.log('Notification caused app to open from quit state:',remoteMessage.notification);
          }
    });
}