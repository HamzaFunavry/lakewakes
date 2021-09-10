import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../../assets/css/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useForgotPassword } from '../../hooks/useLoginUser';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email Required')
    .email('Email is incorrect')
    .trim('spaces not allowed')
    .strict()
});
export default function ForgotPassword() {
  const navigation = useNavigation();
  const forgotMutation = useForgotPassword({
    onSuccess(res) {
      console.log(res);
      navigation.navigate('ForgotPasswordCode');
    },
    onError(error: Error) {
      Alert.alert('Alert',error.message);
    },
  });

  return (
    <KeyboardAvoidingView style={{ padding: 25,backgroundColor:"#fff",flex:1 }}>
        <Text style={{fontSize:20,fontWeight:'700',marginBottom:20,textAlign:'center',color:'#0066b2'}}>
          Forgot Password
        </Text>
        <View style={[{ justifyContent: 'center', alignSelf: 'center' }]}>
        <Image
          source={require('../../assets/images/applogo.png')}
          resizeMode={'contain'}
          style={[{ width: 150, height: 150 }]}
        />
      </View>
      <Formik
        initialValues={{
          email: ''
        }}
        onSubmit={(values) => {
          console.log('====================================');
          console.log(values);
          console.log('====================================');
          forgotMutation.mutate({
            ...values,
          });
        }}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <View style={{ width: '100%',marginTop:20}}>
              <View style={[styles.inputField,styles.shadow]}>
                <TextInput
                  editable={!forgotMutation.isLoading}
                  keyboardType="email-address"
                  style={styles.inputFieldText}
                  value={values.email}
                  placeholderTextColor="#31363b"
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  onChangeText={handleChange('email')}
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorField}>{errors.email}</Text>
              )}
            </View>
            <TouchableOpacity
              disabled={forgotMutation.isLoading}
              onPress={(e)=>{handleSubmit()}}
              style={{ width: '100%' }}>
              <View
                style={[
                  styles.bgColorBlue,
                  styles.shadow,
                  styles.br5,
                  styles.p10,
                  styles.mt10,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    styles.colorWhite,
                    
                    styles.ffb,
                    styles.fs20,
                    { alignSelf: 'center' },
                  ]}>
                  {forgotMutation.isLoading ? 'Sending...' : 'Send Email'}
                </Text>
                {forgotMutation.isLoading && (
                  <ActivityIndicator
                    style={{ marginLeft: 8 }}
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
