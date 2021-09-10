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
import { useLoginUser, useRegisterUser } from '../../hooks/useLoginUser';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name Required'),
  email: Yup.string()
    .required('Email Required')
    .email('Email is incorrect')
    .trim('spaces not allowed')
    .strict(),
  password: Yup.string()
    .required('Password Required')
    .min(6, 'Password must be 6 digits')
    .trim('spaces not allowed')
    .strict(),
});
export default function Register() {
  const navigation = useNavigation();
  const registerUserMutation = useRegisterUser({
    onSuccess(res) {
      console.log(res);
      alert(res.message)
      if(res.statusCode=='200'){
        navigation.goBack();
      }
    },
    onError(error: Error) {
      Alert.alert(error.message);
    },
  });

  return (
    <KeyboardAvoidingView style={{ padding: 25,backgroundColor:"#fff",flex:1 }}>
        <Text style={{fontSize:20,fontWeight:'700',marginBottom:20,textAlign:'center',color:'#0066b2'}}>
          Register
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
          name:'',
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log('====================================');
          console.log(values);
          console.log('====================================');
          registerUserMutation.mutate({
            ...values,
          });
        }}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <View style={{ width: '100%',marginTop:20 }}>
              <View style={[styles.inputField,styles.shadow]}>
                <TextInput
                  editable={!registerUserMutation.isLoading}
                  keyboardType='default'
                  style={styles.inputFieldText}
                  value={values.name}
                  placeholderTextColor="#31363b"
                  placeholder="Name"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  onChangeText={handleChange('name')}
                  autoCorrect={false}
                />
              </View>
              {errors.name && (
                <Text style={styles.errorField}>{errors.name}</Text>
              )}
            </View>
            <View style={{ width: '100%'}}>
              <View style={[styles.inputField,styles.shadow]}>
                <TextInput
                  editable={!registerUserMutation.isLoading}
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
            <View style={{ width: '100%' }}>
              <View style={[styles.inputField,styles.shadow]}>
                <TextInput
                  editable={!registerUserMutation.isLoading}
                  keyboardType="default"
                  style={styles.inputFieldText}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  autoCorrect={false}
                  value={values.password}
                  secureTextEntry={true}
                  placeholderTextColor="#31363b"
                  placeholder="Password"
                  textContentType="none"
                  onChangeText={handleChange('password')}
                />
              </View>
              {errors.password && (
                <Text style={styles.errorField}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              disabled={registerUserMutation.isLoading}
              onPress={(e)=>handleSubmit()}
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
                  {registerUserMutation.isLoading ? 'Register' : 'Register'}
                </Text>
                {registerUserMutation.isLoading && (
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
