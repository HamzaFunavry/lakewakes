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
import { useupdateUser } from '../../hooks/useLoginUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { usegetUserProfile } from '../../hooks/useGetuserProfile';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email Required').email('Email is incorrect').trim('spaces not allowed').strict(),
  name: Yup.string().required('Name Required'),
});
export default function EditProfile() {
  const updateUserMutation = useupdateUser({
    onSuccess(res) {
      console.log(res);
      alert(res.message);
    },
    onError(error: Error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      Alert.alert(error.message);
    },
  });
  const getUserProfiles = usegetUserProfile<any>();
  return (
    <SafeAreaView style={{flex:1 }}>
      <Header pageName={""} />
    <KeyboardAvoidingView style={{ padding: 25,backgroundColor:"#fff",flex:1 }}>
        <Text style={{fontSize:20,fontWeight:'700',marginBottom:20,textAlign:'center',color:'#0066b2'}}>
          Edit Profile
        </Text>
        <View style={[{ justifyContent: 'center', alignSelf: 'center' }]}>
        <Image
          source={require('../../assets/images/applogo.png')}
          resizeMode={'contain'}
          style={[{ width: 150, height: 150 }]}
        />
      </View>
      {!getUserProfiles.isLoading && (
        <Formik initialValues={{
            name: getUserProfiles.data.data[0].name,
            email: getUserProfiles.data.data[0].email
          }}
          onSubmit={(values) => {
            updateUserMutation.mutate({
              ...values,
            });
          }}
          validationSchema={validationSchema}>
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <View style={{ width: '100%',marginTop:20 }}>
                <View style={[styles.inputField,styles.shadow]}>
                  <TextInput
                    editable={!updateUserMutation.isLoading}
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
              <View style={{ width: '100%' }}>
                <View style={[styles.inputField,styles.shadow]}>
                  <TextInput
                    editable={!updateUserMutation.isLoading}
                    keyboardType='email-address'
                    style={styles.inputFieldText}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    value={values.email}
                    placeholderTextColor="#31363b"
                    placeholder="Email"
                    textContentType="none"
                    onChangeText={handleChange('email')}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.errorField}>{errors.email}</Text>
                )}
              </View>
              
              <TouchableOpacity
                disabled={updateUserMutation.isLoading}
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
                    {updateUserMutation.isLoading ? 'Saving...' : 'Edit'}
                  </Text>
                  {updateUserMutation.isLoading && (
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
      )}
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
