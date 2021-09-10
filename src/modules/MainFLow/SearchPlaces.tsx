import React from 'react'
import { View, Text } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function SearchPlaces() {
    return (
        <View style={{flex:1}}>
            <GooglePlacesAutocomplete
                placeholder='Your Starting Position'
                minLength={2}
                listViewDisplayed="auto"
                query={{
                  key: 'AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM',
                  language: 'en',
                }}
                nearbyPlacesAPI= 'GooglePlacesSearch'
                fetchDetails={true}
                onPress={(data, details) => console.log(data, details)}
                styles={{
                  textInput: {
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
              />
        </View>
    )
}
