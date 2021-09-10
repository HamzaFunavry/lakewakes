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
import MainBtn from '../../components/MainBtn';
import { useNavigation } from '@react-navigation/core';
import { useForgotPasswordCode, useLoginUser } from '../../hooks/useLoginUser';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code Required'),
    password: Yup.string()
        .required('Password Required')
        .min(6, 'Password must be 6 digits')
        .trim('spaces not allowed')
        .strict(),
});
export default function ForgotPasswordCode() {
    const navigation = useNavigation();
  const forgotcodeMutation = useForgotPasswordCode({
    onSuccess(res) {
      console.log(res);
      if(res.statusCode==200){
        navigation.navigate('LoginScreen')
      }
      Alert.alert(res.message);
    },
    onError(error: Error) {
      Alert.alert(error.message);
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
            code: '',
            password:''
        }}
        onSubmit={(values) => {
          console.log('====================================');
          console.log(values);
          console.log('====================================');
          forgotcodeMutation.mutate({
            ...values,
          });
        }}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <View style={{ width: '100%'}}>
              <View style={[styles.inputField,styles.shadow]}>
                <TextInput
                  editable={!forgotcodeMutation.isLoading}
                  keyboardType='number-pad'
                  style={styles.inputFieldText}
                  value={values.code}
                  placeholderTextColor="#31363b"
                  placeholder="Code"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  onChangeText={handleChange('code')}
                  autoCorrect={false}
                />
              </View>
              {errors.code && (
                <Text style={styles.errorField}>{errors.code}</Text>
              )}
              <View style={[styles.inputField,styles.shadow]}>
                <TextInput
                  editable={!forgotcodeMutation.isLoading}
                  keyboardType='default'
                  style={styles.inputFieldText}
                  value={values.password}
                  placeholderTextColor="#31363b"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  autoCorrect={false}
                />
              </View>
              {errors.password && (
                <Text style={styles.errorField}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              disabled={forgotcodeMutation.isLoading}
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
                  {forgotcodeMutation.isLoading ? 'Reseting...' : 'Reset Password'}
                </Text>
                {forgotcodeMutation.isLoading && (
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
