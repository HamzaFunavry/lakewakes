import React, { useEffect, useState } from 'react'
import { View, Text,Image, SafeAreaView , ScrollView, FlatList} from 'react-native'
import styles from "../../assets/css/styles";
import Header from '../../components/Header';
import { useGetNotification } from '../../hooks/useGetuserProfile';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
Geocoder.init("AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM");
export default function Notification() {
    const NotificationData = useGetNotification<any>();
    console.log('=========getUserProfiles===========================');
    console.log(NotificationData);
    console.log('=========getUserProfiles===========================');
    const navigation= useNavigation()
    return (
        <SafeAreaView >
            <Header pageName={""} />
            <Text style={{fontSize:20,fontWeight:'700',marginVertical:20,textAlign:'center',color:'#0066b2'}}>
                Notifications
            </Text>
            <FlatList
                data={NotificationData?.data?.data}
                contentContainerStyle={{paddingHorizontal: 20}}
                ListEmptyComponent={<Text>No Nitifications</Text>}
                renderItem={({item}) => <ListNotification item={item} navigation={navigation}/>}
                keyExtractor={(item, index) => '' + index}
                // style={{flex: 1}}
            />
        </SafeAreaView>
    )
}
function ListNotification({item,navigation}:any){
    const [address, setaddress] = useState('initialState')
    const geocode=()=>{
        console.log('===========item=========================');
        console.log(item);
        console.log('============item========================');
        Geocoder.from(parseFloat(item.lat), parseFloat(item.longt))
        .then(json => {
            console.log( json.results[0].formatted_address);
            setaddress(json.results[0].formatted_address)
        })
    }
    useEffect(() => {
        geocode()
    }, [])
    return(
        <TouchableOpacity 
        onPress={()=>{navigation.navigate('EmergencyMap',{item})}}
        style={[styles.shadow,{
            backgroundColor: '#fff',
            marginTop: 10,
            padding:15,
            borderRadius:10
        }]}>
            <Text style={[styles.ffb,{fontSize:16,}]}>Name : {item.name}</Text>
            <Text style={[styles.ffb,{fontSize:16,}]}>Email : ({item.email})</Text>
            <Text>Location : {address}</Text>
        </TouchableOpacity>
    )
    
}