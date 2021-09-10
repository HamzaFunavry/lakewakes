import React , {useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../store/userSlice';

export function LogoutScreen() {
    useEffect(()=>{
      confirmLogoutAlert();
      console.log('component mounted!')
    },[]) 

    const dispatch = useDispatch();

    const confirmLogoutAlert = () =>
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

    return (
        <View>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={confirmLogoutAlert}>
            <Text>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
    )
}
