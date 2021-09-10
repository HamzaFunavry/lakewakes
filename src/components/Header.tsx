import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from '../assets/css/styles';

export default function Header(props) {
    const navigation = useNavigation();
    return (
        <View
        style={[
          {
            padding: 20,
            // paddingBottom:20,
            backgroundColor: "#0066b2",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image
              source={require("../assets/images/menu.png")}
              style={{ width: 25, height: 25 }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>

          <Text style={[styles.colorWhite, styles.fs18, styles.ffm]}>
          {props?.pageName}
          </Text>
        </View>
      </View>
      
    )
}

