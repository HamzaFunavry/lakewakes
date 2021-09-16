import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import { Alert, Platform, StatusBar, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/redux';
import { ErrorBoundaryCatchAll } from './src/components/ErrorBoundaryScreen';
import { useAppSelector } from './src/store/hooks';
import { NavigationContainer } from '@react-navigation/native';
import { AuthFlow, MainFlow} from './Navigators';
import { loadUserFromStorage } from './src/store/userSlice';
import messaging from '@react-native-firebase/messaging';
const queryClient = new QueryClient();
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const token = await messaging().getToken();
    console.log('====================================');
    console.log(token);
    console.log('====================================');
  }
}
function App() {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <ErrorBoundaryCatchAll>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle="dark-content" />
          <AppBootStrap />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundaryCatchAll>
  );
}


const AppBootStrap = React.memo(function () {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  if (userState.isLoadingStorageData) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
          <Text>Use Splash screen over here</Text>
        </View>
    );
  }

  return (
    <NavigationContainer>
      {(userState.isLoggedIn) && (
        <MainFlow />
      )}
      {!userState.isLoggedIn && (
        <AuthFlow />
      )}
    </NavigationContainer>
  );
});

export default App;
