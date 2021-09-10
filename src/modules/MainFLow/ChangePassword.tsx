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
import { useChangePassword, useLoginUser } from '../../hooks/useLoginUser';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const validationSchema = Yup.object().shape({
    oldpassword: Yup.string()
        .required('Current Password Required')
        .min(6, 'Current Password must be 6 digits')
        .trim('spaces not allowed')
        .strict(),
    newpassword: Yup.string()
        .required('New Password Required')
        .min(6, 'New Password must be 6 digits')
        .trim('spaces not allowed')
        .strict()
});
export default function ChangePassword() {
    const changepasswordMutation = useChangePassword({
        onSuccess(res) {
            console.log('============res========================');
            console.log(res);
            console.log('============res========================');
            Alert.alert('Alert',res.message);
        },
        onError(error: Error) {
        Alert.alert(error.message);
        },
    });

    return (
        <SafeAreaView style={{flex:1 }}>
        <Header pageName={""} />
        <KeyboardAvoidingView style={{ padding: 25,backgroundColor:"#fff",flex:1 }}>
            <Text style={{fontSize:20,fontWeight:'700',marginBottom:20,textAlign:'center',color:'#0066b2'}}>
            Change Password
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
                oldpassword: '',
                newpassword: ''
            }}
            onSubmit={(values) => {
              changepasswordMutation.mutate({
                ...values,
              });
            }}
            validationSchema={validationSchema}>
            {({ handleChange, handleSubmit, values, errors }) => (
            <View>
                <View style={{ width: '100%',marginTop:20 }}>
                <View style={[styles.inputField,styles.shadow]}>
                    <TextInput
                    editable={!changepasswordMutation.isLoading}
                    keyboardType='default'
                    secureTextEntry={true}
                    style={styles.inputFieldText}
                    value={values.oldpassword}
                    placeholderTextColor="#31363b"
                    placeholder="Current Password"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    onChangeText={handleChange('oldpassword')}
                    autoCorrect={false}
                    />
                </View>
                {errors.oldpassword && (
                    <Text style={styles.errorField}>{errors.oldpassword}</Text>
                )}
                </View>
                <View style={{ width: '100%' }}>
                <View style={[styles.inputField,styles.shadow]}>
                    <TextInput
                    editable={!changepasswordMutation.isLoading}
                    keyboardType='default'
                    secureTextEntry={true}
                    style={styles.inputFieldText}
                    value={values.newpassword}
                    placeholderTextColor="#31363b"
                    placeholder="New Password"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    onChangeText={handleChange('newpassword')}
                    autoCorrect={false}
                    />
                </View>
                {errors.newpassword && (
                    <Text style={styles.errorField}>{errors.newpassword}</Text>
                )}
                </View>
                {/* <View style={{ width: '100%' }}>
                <View style={[styles.inputField,styles.shadow]}>
                    <TextInput
                    editable={!changepasswordMutation.isLoading}
                    keyboardType='default'
                    secureTextEntry={true}
                    style={styles.inputFieldText}
                    value={values.confirmpswd}
                    placeholderTextColor="#31363b"
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    onChangeText={handleChange('confirmpswd')}
                    autoCorrect={false}
                    />
                </View>
                {errors.confirmpswd && (
                    <Text style={styles.errorField}>{errors.confirmpswd}</Text>
                )}
                </View> */}
                <TouchableOpacity
                disabled={changepasswordMutation.isLoading}
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
                    {changepasswordMutation.isLoading ? 'Saving...' : 'Save'}
                    </Text>
                    {changepasswordMutation.isLoading && (
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
        </SafeAreaView>
    );
}
