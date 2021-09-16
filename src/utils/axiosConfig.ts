// First we need to import axios.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userKey } from "../store/userSlice";
import { SERVER_URL } from "./constants";
import { User } from "../interfaces/LoginResponse";
// Next we make an 'instance' of it
const instance = axios.create({
  baseURL: SERVER_URL,
});

const excludedUrls = ["/login", "/register","/forgotPassword","/passwordResetOnCode"];
const applepay=['/applePay'];

instance.interceptors.request.use(async function (config) {
  config.timeoutErrorMessage = "Request Timed Out";
  if (config.baseURL === SERVER_URL && applepay[0]==config.url){
    config.headers.Authorization = global.token;
  }
  else if ( config.baseURL === SERVER_URL && !excludedUrls.find((i) => config.url.includes(i)) ) {
    let userData = await AsyncStorage.getItem(userKey);
    const parsedUser: User = JSON.parse(userData);
    config.headers.Authorization = parsedUser.token;
  }
  return config;
});

export { instance as http };
