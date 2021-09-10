import 'react-native-gesture-handler'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/modules/Auth/LoginScreen';
import Register from './src/modules/Auth/Register';
import ForgotPassword from './src/modules/Auth/ForgotPassword';
import Terms from './src/modules/MainFLow/Terms';
import EditProfile from './src/modules/MainFLow/EditProfile';
import Maps from './src/modules/MainFLow/Maps';
import SearchPlaces from './src/modules/MainFLow/SearchPlaces';
import { useAppSelector } from './src/store/hooks';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Alert, View,Text, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { logOutUser } from './src/store/userSlice';
import ChangePassword from './src/modules/MainFLow/ChangePassword';
import Privacy from './src/modules/MainFLow/Privacy';
import Share from 'react-native-share';
import ForgotPasswordCode from './src/modules/Auth/ForgotPasswordCode';
const AuthStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

// Logout Function 
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => (
        <View style={{flexDirection:'row'}}>
          <Text style={{ color: 'white', fontSize:20,fontWeight:'500' }}>Suggestion</Text>
        </View>
      )}
        onPress={() => {
            Linking.openURL(`tel:+16787021649`)
        }}
      />
      <DrawerItem label={() => (
        <View style={{flexDirection:'row'}}>
          <Text style={{ color: 'white', fontSize:20,fontWeight:'500' }}>Share</Text>
        </View>
      )}
        onPress={() => {
          Share.open({
            title:'Lake Wakes',
            message:`Please install Lake Wakes app,\n\nLake Wakes Android Link :https://play.google.com/store/apps/ \n\nLake Wakes IOS Link :https://apps.apple.com/pk/app/`
          }).then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        }}
      />
      <DrawerItem label={() => (
        <View style={{flexDirection:'row'}}>
          <Text style={{ color: 'white', fontSize:20,fontWeight:'500' }}>Logout</Text>
        </View>
      )}
        onPress={() => {
          Alert.alert(
            "Confirm Logout",
            "Are you sure you want to logout?",
            [
              {
                text: "Yes",
                onPress: () => {dispatch(logOutUser())}  
              },
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ]
          );
        }}
      />
    </DrawerContentScrollView>
  );
}
// Logout Function 

export function AuthFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false ,headerBackTitleVisible:false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ title: '',headerBackTitleVisible:false,headerTintColor: '#2856a2', headerStyle: { backgroundColor: '#fff' }  }}
        name="Register"
        component={Register}
      />
      <AuthStack.Screen
        options={{ title: '',headerBackTitleVisible:false,headerTintColor: '#2856a2', headerStyle: { backgroundColor: '#fff' }  }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthStack.Screen
        options={{ title: '',headerBackTitleVisible:false,headerTintColor: '#2856a2', headerStyle: { backgroundColor: '#fff' }  }}
        name="ForgotPasswordCode"
        component={ForgotPasswordCode}
      />
      
    </AuthStack.Navigator>
  );
}
export function MainFlow() {
  const userState = useAppSelector(state => state.user);
  return (
    <DrawerStack.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: '#0066b2',
        width: 320,
      }}
      drawerContentOptions={{
        activeTintColor: '#fff',
        inactiveTintColor:'#fff',
        inactiveBackgroundColor: 'transparent',
        labelStyle: {
          fontSize: 20,
        }
      }}
    >

      <DrawerStack.Screen
        name="Maps"
        options={{
          title: 'Map',
          headerStyle: {
            backgroundColor: '#f4f6fa',
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
        component={Maps}
      />
      <DrawerStack.Screen
        name="EditProfile"
        options={{
          title: 'EditProfile',
          headerStyle: {
            backgroundColor: '#f4f6fa',
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
        component={EditProfile}
      />
      <DrawerStack.Screen
        name="ChangePassword"
        options={{
          title: 'ChangePassword',
          headerStyle: {
            backgroundColor: '#f4f6fa',
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
        component={ChangePassword}
      />
      <DrawerStack.Screen
        name="Terms"
        options={{
          title: 'Terms & Conditions',
          headerStyle: {
            backgroundColor: '#f4f6fa',
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
        component={Terms}
      />
      {/* <DrawerStack.Screen
        name="Privacy"
        options={{
          title: 'Privacy Policy',
          headerStyle: {
            backgroundColor: '#f4f6fa',
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
        component={Privacy}
      /> */}

    </DrawerStack.Navigator>
  );
}