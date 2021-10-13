import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TextInput,
    PermissionsAndroid,
    Image,
    Alert,
    Pressable,
    Keyboard,
    Platform,
  } from "react-native";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import MapView, { Callout, Marker, Polyline } from "react-native-maps";
  import styles from "../../assets/css/styles";
  import Header from "../../components/Header";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import { useNavigation } from "@react-navigation/native";
  import Geolocation from "react-native-geolocation-service";
  import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
  import { useGetNearbyPlaces } from "../../hooks/useGetNearbyPlaces";
  import FastImage from "react-native-fast-image";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useEmergency } from "../../hooks/useLoginUser";
  
  type Location = {
    lat: number;
    long: number;
  };
  
  const stylez = StyleSheet.create({
    contentContainer: {
      flex: 1,
      padding: 8,
    },
    list: { flex: 1, backgroundColor: "#ffffff" },
  });
  
  export default function EmergencyMap(props) {
      console.log('=================EmergencyMapitem===================');
      console.log(props.route.params.item);
      console.log('================= EmergencyMap item===================');
    const [endingPosition, setEndingPosition] = useState<Location | null>({
        lat: parseFloat(props.route.params.item.lat),
        long: parseFloat(props.route.params.item.longt),
    });
    const [geoLocation, setGeoLocation] = useState<Geolocation.GeoPosition | null>(null);
  
  
  
    useEffect(() => {
        console.log('inside');
        setTimeout(() => {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log('==========position==========================');
              console.log(position);
              console.log('==========position==========================');
              setGeoLocation(position);
              console.log("current pos", position);
            },
            (error) => {
              console.log('getCurrentPosition',error.code, error.message);
            },
            {
              enableHighAccuracy: true,
              showLocationDialog: true,
              timeout: 2000, maximumAge: 10000
            }
          );
        }, 1000);
        
  
        Geolocation.watchPosition(
          (position) => {
            setGeoLocation(position);
          },
          (error) => {
            console.log('watchPosition',error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            showLocationDialog: true,
          }
        );
    }, []);
    return (
      <View style={{flex:1}}>
        <View 
        style={[styles.shadow,{
            backgroundColor: '#fff',
            marginTop: 10,
            padding:15,
            borderRadius:10
        }]}>
           <Text style={[styles.ffb,{fontSize:16,}]}>Emergency User Information:</Text>
            <Text style={[styles.ffr,{fontSize:16,}]}>Name : {props.route.params.item.name}</Text>
            <Text style={[styles.ffr,{fontSize:16,}]}>Email : ({props.route.params.item.email})</Text>
        </View>
        <MapView
          style={styles.mapEmergency}
          region={{
            latitude: endingPosition?.lat ?? endingPosition.lat ?? 34.2305586712752,
            longitude: endingPosition?.long ?? endingPosition.long ?? -83.96832354860678,
            latitudeDelta: 0.03,
            longitudeDelta: 0.50,
          }}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={true}
        >
          {geoLocation && (
            <Marker
              coordinate={{
                latitude: geoLocation.coords.latitude,
                longitude: geoLocation.coords.longitude,
              }}
              title="Starting Point"
              pinColor={"#0066b2"}
            />
          )}
  
          {/* use current location */}
          {geoLocation && (
            <Marker
              coordinate={{
                latitude: geoLocation.coords.latitude,
                longitude: geoLocation.coords.longitude,
              }}
              image={require("../../assets/images/boat.png")}
              title="Current Location"
              pinColor={"#0066b2"}
            />
          )}
  
          {endingPosition && (
            <Marker
              // draggable
              coordinate={{
                latitude: endingPosition.lat,
                longitude: endingPosition.long,
              }}
              title="Destination Point"
              pinColor={"#FF6347"}
              onDragEnd={(e) => {
                setEndingPosition({
                  lat: e.nativeEvent.coordinate.latitude,
                  long: e.nativeEvent.coordinate.longitude,
                });
              }}
            />
          )}
  
          {geoLocation && endingPosition && (
            <Polyline
              coordinates={[
                {
                  latitude: geoLocation.coords.latitude,
                  longitude: geoLocation.coords.longitude,
                },
                {
                  latitude: endingPosition.lat,
                  longitude: endingPosition.long,
                },
              ]}
              strokeColor="#00CED1"
              strokeWidth={6}
            />
          )}
        </MapView>
      </View>
    );
  }
  