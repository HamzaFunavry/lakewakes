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

export default function Maps() {
  const navigation = useNavigation();
  const [startingPosition, setStartingPosition] = useState<Location | null>(
    null
  );
  const [endingPosition, setEndingPosition] = useState<Location | null>(null);
  const [isGeoLocationPermissionGranted, setIsGeoLocationPermissionGranted] =
    useState(false);
  const [geoLocation, setGeoLocation] =
    useState<Geolocation.GeoPosition | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const getNearbyPlaces = useGetNearbyPlaces(
    {
      location: {
        lat: endingPosition?.lat ?? 0,
        long: endingPosition?.long ?? 0,
      },
      radius: 1500,
      type: "restaurant",
    },
    {
      enabled: !!endingPosition?.lat,
    }
  );

  useEffect(() => {
    const didShow = Keyboard.addListener("keyboardDidShow", () => {
      bottomSheetRef.current.close();
    });
    const didHide = Keyboard.addListener("keyboardDidHide", () => {
      if (getNearbyPlaces.data && !getNearbyPlaces.isFetching) {
        bottomSheetRef.current.expand();
      }
    });

    // cleanup function
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, [getNearbyPlaces.data]);

  const requestGeoLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Navigation App Needs Geolocation Permission",
          message:
            "Navigation App needs access to your location" +
            "so you can track stuff",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsGeoLocationPermissionGranted(true);
      } else {
        setIsGeoLocationPermissionGranted(false);
        Alert.alert("GeoLocation Permission is required");
      }
    } catch (err) {
      Alert.alert(err.message);
      setIsGeoLocationPermissionGranted(false);
    }
  };

  useEffect(() => {
    if(Platform.OS=='android'){
      requestGeoLocationPermission();
    }
    else if(Platform.OS=='ios'){
      Geolocation.requestAuthorization('whenInUse').then((res)=>{
        console.log(res);
        if(res=='granted'){
          setIsGeoLocationPermissionGranted(true);
        }
        else{
          setIsGeoLocationPermissionGranted(false);
          Alert.alert("GeoLocation Permission is required");
        }
      }).catch((err)=>{
        console.log(err);
        setIsGeoLocationPermissionGranted(false);
        Alert.alert("GeoLocation Permission is required");
      })
    }
  }, []);

  useEffect(() => {
    if (!getNearbyPlaces.data && !getNearbyPlaces.isFetching) {
      bottomSheetRef.current.close();
    } else {
      bottomSheetRef.current.expand();
    }
  }, [getNearbyPlaces.data]);

  useEffect(() => {
    if (isGeoLocationPermissionGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          // current position
          setGeoLocation(position);
          console.log("current pos", position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          showLocationDialog: true,
        }
      );

      Geolocation.watchPosition(
        (position) => {
          
          setGeoLocation(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          showLocationDialog: true,
        }
      );
    }
  }, [isGeoLocationPermissionGranted]);

  const toggleItem = useCallback((selectedItem: any) => {
    setEndingPosition({
      lat: selectedItem.geometry.location.lat,
      long: selectedItem.geometry.location.lng,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    ({ item }) => <NearbyPlace item={item} toggleItem={toggleItem} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const keyExtractor = useCallback((item, i) => "" + i, []);
  console.log(geoLocation);
  const emergencyFun =()=>{
    Alert.alert('Emergency','Do you want to notify other that you are in emergency?',
    [
      {
        text: "Yes",
        onPress: () => {
          emergencyMutation.mutate({
            longt:geoLocation.coords.longitude.toString(),
            lat:geoLocation.coords.latitude.toString()
          });
        }  
      },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ]
    )
  }
  const emergencyMutation = useEmergency({
    onSuccess(res) {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      Alert.alert('Emergency Notification','Emergency Notification Send To All Lake Wakes Users.')
    },
    onError(error: Error) {
      Alert.alert(error.message);
    },
  });
  return (
    <SafeAreaView style={{flex:1}}>
      <Header pageName={""} />
      <View
        style={{
          height: 150,
          paddingHorizontal: 20,
          backgroundColor: "#0066b2",
          paddingVertical: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Your Starting Position"
          minLength={2}
          query={{
            key: "AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM",
            language: "en",
          }}
          nearbyPlacesAPI="GoogleReverseGeocoding"
          GoogleReverseGeocodingQuery={{}}
          fetchDetails={true}
          onPress={(data, details) =>
            setStartingPosition({
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng,
            })
          }
          styles={{
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
              zIndex: 9999,
            },
            container: {
              padding: 0,
              height: 40,
              zIndex: 9999,
            },
            textInputContainer: {
              padding: 0,
              margin: 0,
              zIndex: 9999,
            },

            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            listView: {
              zIndex: 99999,
              height: 150,
              position: "absolute",
              top: 40,
            },
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Your Destination Position"
          minLength={2}
          listViewDisplayed="auto"
          query={{
            key: "AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM",
            language: "en",
          }}
          nearbyPlacesAPI="GoogleReverseGeocoding"
          GoogleReverseGeocodingQuery={{}}
          fetchDetails={true}
          onPress={(data, details) =>
            setEndingPosition({
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng,
            })
          }
          styles={{
            container:{
              zIndex: -1,
            },
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
              zIndex: -1,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            textInputContainer: {
              zIndex: -1,
            },
            listView: {
              zIndex: 99,
              position: "absolute",
              height: 200,
              top: 40,
            },
          }}
        />
      </View>
      
      <MapView
        style={styles.map}
        region={{
          latitude: startingPosition?.lat ?? geoLocation?.coords.latitude ?? 34.2305586712752,
          longitude: startingPosition?.long ?? geoLocation?.coords.longitude ?? -83.96832354860678,
          latitudeDelta: 0.01,
          longitudeDelta: 0.02,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={true}
      >
        {startingPosition && (
          <Marker
            coordinate={{
              latitude: startingPosition.lat,
              longitude: startingPosition.long,
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
            draggable
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

        {startingPosition && endingPosition && (
          <Polyline
            coordinates={[
              {
                latitude: startingPosition.lat,
                longitude: startingPosition.long,
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
      <View style={[{zIndex:99999999,position: 'absolute',bottom:35,right:15}]}>
        <TouchableOpacity style={[styles.shadow,{ backgroundColor:'#fff',padding:10,borderRadius:50,}]} onPress={emergencyFun}>
          <Image resizeMode={'contain'} source={ require('../../assets/images/emergencyicon.png') } style={{width:35,height:35 }} />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        bottomInset={0}
        enableContentPanningGesture={false}
        index={getNearbyPlaces.data ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={stylez.contentContainer}>
          {getNearbyPlaces.isLoading && <Text>Loading places</Text>}
          {getNearbyPlaces.isError && <Text>Error Loading Places</Text>}
          {getNearbyPlaces.data && (
            <BottomSheetFlatList
              data={getNearbyPlaces.data?.results ?? []}
              renderItem={renderItem}
              horizontal
              keyExtractor={keyExtractor}
              style={stylez.list}
              ListEmptyComponent={(<Text>Nothing to show</Text>)}
            />
          )}
        </View>
      </BottomSheet>
      
    </SafeAreaView>
  );
}

function NearbyPlace({
  item,
  toggleItem,
}: {
  item: any;
  toggleItem: (any) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        toggleItem(item);
      }}
      style={{
        height: "100%",
        backgroundColor: item.photos?.[0].photo_reference
          ? undefined
          : "lightgray",
        width: 150,
        marginHorizontal: 4,
        borderRadius: 8,
      }}
    >
      {item.photos?.[0].photo_reference && (
        <FastImage
          style={{ flex: 1, borderRadius: 8 }}
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0]?.photo_reference}&key=AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM`,
          }}
        />
      )}

      <Text
        numberOfLines={2}
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 4,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
