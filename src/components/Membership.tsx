import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import styles from '../assets/css/styles'

export default function Membership(props) {
    return (
        <View style={[styles.cardview,{padding:20}]}>
            <Text style={[styles.cardtopheading,{marginBottom:10}]}>Membership FEE</Text>
            <View>
                <Text style={[styles.cardtopprice]}>
                    {props.paymentobj?.localizedPrice} <Text style={[styles.cardtopnormal,{marginLeft:10}]}>per year</Text>
                </Text>
            </View>
            <View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <Text style={[styles.cardtopnormal]}>
                        1- In order to use the Lakewakes app you will need to become a member
                    </Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <Text style={[styles.cardtopnormal]}>
                        2- Get navigational route in lakes 
                    </Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    
                    <Text style={[styles.cardtopnormal]}>
                        3- Get Nearby Restaurants Locations.
                    </Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <Text style={[styles.cardtopnormal]}>
                        4- Any time change your destination Points.
                    </Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <Text style={[styles.cardtopnormal]}>
                        5- 24 Hour technical support
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={{ width: "100%" }}onPress={()=>{props.setsubmodel(false);props.requestPurchase('one_time_membership')}} >
            <View
                style={[
                styles.bgColorBlue,
                styles.shadow,
                styles.br5,
                styles.p10,
                styles.mt10,
                {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
                ]}
            >
                <Text
                style={[
                    styles.colorWhite,

                    styles.ffb,
                    styles.fs20,
                    { alignSelf: "center" },
                ]}
                >
                Buy Subscription
                </Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}
