import React from 'react'
import { View, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import styles from '../../assets/css/styles'
import Header from '../../components/Header'

export default function Terms() {
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#fff'}}>
          <Header pageName={""} />
          <ScrollView style={{padding:20,paddingTop:20}}>
              <Text style={{fontSize:20,fontWeight:'700',marginBottom:20}}>
                Terms & Conditions
              </Text>
              <Text style={styles.faqsdetailtxt3}>
              You are about to join the first network of boaters working together to build and share real-time water intelligence. Since Lake wakes is 100% user-generated we need your collaboration and service.
              {'\n'}{'\n'}
              1. You have read and agree to the terms of use Lake wakes. Net and privacy policy of Lake wakes.
              Net/ agreements. The use of the service is subject to the agreements and indicates your consent
              to them. This Summary is not meant to replace them. It is intended for convenience purposes
              only.
              {'\n'}{'\n'}
              2. YOUR USE OF THIS REAL TIME ROUTE GUIDANCE APPLICATION IS AT YOUR OWN RISK.
              {'\n'}{'\n'}
              3. You agreed to Lake Wakes receiving from your mobile device detail location and Route
              information, for example in the form of GPS signals and other information. Lake wakes uses this
              information to offer the service to you, to improve the quality of the service in office to you and
              to all of its users and to improve the accuracy Of its mapping and navigation data. In particular,
              Lake Wakes uses this location in route information to create a detailed history of all the journeys
              you have made while using the lake wakes application. Lake Wakes allows you to use the
              application for merchandise and other items for free. But in order to use the navigational app
              you will need to become a member. There is a one time yearly fee of $9.99 that you can cancel
              anytime
              {'\n'}{'\n'}
              4. Always pay full attention to the water and abide with all Transportation laws and regulations
              sending traffic updates and text messages to the service while you drive is strictly prohibited.
              {'\n'}{'\n'}
              5. You hereby confirm that you own all exclusive rights at any data and content that you provide to
              the service and made a sign and license such rights. You keep all the title and rights to the sublicensable transferable and Perpetual license to use, copy, distribute, create derivative Works of
              publicly display, publish perform and exploit in any other manner the content. Subject to the
              aforementioned, the company keeps title and All rights to the services database which you may
              use for non-commercial in private purposes only.
              {'\n'}{'\n'}
              6. Lake wakes has a $9.95 monthly fee that you can cancel at anytime there is no long-term
              commitment and no extra penalties for cancellation.
              {'\n'}{'\n'}{'\n'}
              </Text>
            {/* </View> */}
          </ScrollView>

      </SafeAreaView>
    )
}
