import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import styles from "../../assets/css/styles";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { useNavigation } from "@react-navigation/core";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { useState } from "react";
import * as RNIap from "react-native-iap";
import { useGetProductsFromStore } from "../../hooks/useGetProductsFromStore";
import { SafeAreaView } from "react-native-safe-area-context";
import Membership from "../../components/Membership";
import Modal from 'react-native-modal';
import { finishTransaction, InAppPurchase, ProductPurchase, PurchaseError, purchaseErrorListener, purchaseUpdatedListener, SubscriptionPurchase } from "react-native-iap";
import { User } from "../../interfaces/LoginResponse";
import axios from "axios";
import { useApplePay } from "../../hooks/useApplePay";
const itemSkus = Platform.select({
  ios: ['one_time_membership'],
  android: ["lakewakes_995_forever"],
});

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Required")
    .email("Email is incorrect")
    .trim("spaces not allowed")
    .strict(),
  password: Yup.string()
    .required("Password Required")
    .min(6, "Password must be 6 digits")
    .trim("spaces not allowed")
    .strict(),
});

export function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loginres, setloginres] = useState<any>('')
  const [submodel, setsubmodel] = useState<boolean>(false);
  const [paymentobj, setpaymentobj] = useState({});
  const [paymentbody, setpaymentbody] = useState<ProductPurchase>();
  const getProductsFromStore = useGetProductsFromStore(itemSkus, {
    onSuccess(res) {
      setpaymentobj(res[0])
    },
    onError(err) { console.log(err); },
    enabled: false,
  });

  const requestPurchase = async (sku): Promise<void> => {
    try {
      RNIap.requestPurchase('one_time_membership');
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  let purchaseUpdated;
  let purchaseError;
  useEffect(() => {
    RNIap.initConnection().then(async ()=>{
      if (Platform.OS === 'android') {
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      } else {
        await RNIap.clearTransactionIOS();
      }
    })
    getProductsFromStore.refetch();
    purchaseUpdated = purchaseUpdatedListener(
      async (purchase: InAppPurchase ) => {
        console.info('purchase', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          if (Platform.OS === 'ios') {
              var body={
                  productId:purchase.productId,
                  transactionDate:purchase.transactionDate,
                  transactionId:purchase.transactionId,
                  transactionReceipt:purchase.transactionReceipt
              }
              setpaymentbody(body)
              applepayMutation.mutate(body);
          }
        }
      },
    );

    purchaseError = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      },
    );

    return()=>{
     try {
      purchaseUpdated.remove()
     } catch (error) { } 
     try {
      purchaseError.remove()
     } catch (error) { }
     try {
      RNIap.endConnection()
     } catch (error) { }
    }
  }, []);
  
  
  const loginUserMutation = useLoginUser({
    onSuccess(res) {
      global.token=res.data.token;
      setloginres(res.data);
    },
    onError(error: Error) {
      Alert.alert(error.message);
    },
  });

  const applepayMutation = useApplePay({
    onSuccess(res) {
      RNIap.finishTransaction(paymentbody).then((result)=>{
        dispatch(loginUser(loginres));
      }).catch((err)=>{
        RNIap.clearTransactionIOS();
      })
    },
    onError(error: Error) {
      RNIap.clearTransactionIOS();
    },
  });
  useEffect(() => {
    if(loginres){
      if(!loginres.paymentStatus){
        setsubmodel(true)
      }
      else{
        dispatch(loginUser(loginres));
      }
    }
  }, [loginres])
  return (
    <SafeAreaView style={{ padding: 25, backgroundColor: "#fff", flex: 1 }}>
      <View style={[{ justifyContent: "center", alignSelf: "center" }]}>
        <Image
          source={require("../../assets/images/applogo.png")}
          resizeMode={"contain"}
          style={[{ width: 200, height: 200 }]}
        />
      </View>
      <Text style={{fontSize:20,fontWeight:'700',marginBottom:20,textAlign:'center',color:'#0066b2'}}>
        Login
      </Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          loginUserMutation.mutate({
            ...values,
          });
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
              <View style={[styles.inputField, styles.shadow]}>
                <TextInput
                  editable={!loginUserMutation.isLoading}
                  keyboardType="email-address"
                  style={styles.inputFieldText}
                  value={values.email}
                  placeholderTextColor="#31363b"
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  onChangeText={handleChange("email")}
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorField}>{errors.email}</Text>
              )}
              <View style={[styles.inputField, styles.shadow]}>
                <TextInput
                  editable={!loginUserMutation.isLoading}
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
                  onChangeText={handleChange("password")}
                />
              </View>
              {errors.password && (
                <Text style={styles.errorField}>{errors.password}</Text>
              )}
            <TouchableOpacity disabled={loginUserMutation.isLoading}
              onPress={(e)=>{handleSubmit()}}
              style={{ width: "100%" }}
            >
              <View
                style={[
                  styles.bgColorBlue,
                  styles.shadow,
                  styles.br5,
                  styles.p10,
                  styles.mt10,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.colorWhite,

                    styles.ffb,
                    styles.fs20,
                    { alignSelf: "center" },
                  ]}
                >
                  {loginUserMutation.isLoading ? "Logging In" : "Login"}
                </Text>
                {loginUserMutation.isLoading && (
                  <ActivityIndicator style={{ marginLeft: 8 }} color="white" />
                )}
              </View>
            </TouchableOpacity>
            
          </View>
        )}
      </Formik>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        <Text
          style={[
            styles.colororange,
            styles.ffb,
            styles.fs16,
            { alignSelf: "flex-end", textDecorationLine: "underline" },
          ]}
        >
          Forgot Password
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.colorBlack,
          styles.ffb,
          styles.fs16,
          styles.mt10,
          { alignSelf: "center" },
        ]}
      >
        OR
      </Text>
      <TouchableOpacity style={{ width: "100%" }}  onPress={() => { navigation.navigate("Register"); }} >
        <Text style={[ styles.mt10, styles.colorBlue, styles.ffb, styles.fs20,
            { alignSelf: "center", textDecorationLine: "underline" } ]} >
          Register
        </Text>
      </TouchableOpacity>
      <Modal isVisible={submodel} hasBackdrop={true} onBackButtonPress={()=>setsubmodel(false)} onBackdropPress={()=>setsubmodel(false)}>
        <Membership paymentobj={paymentobj} requestPurchase={requestPurchase} setsubmodel={setsubmodel}/>
      </Modal>
    </SafeAreaView>
  );
}
