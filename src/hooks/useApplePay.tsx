import { useMutation, UseMutationOptions } from 'react-query';
import { http } from '../utils/axiosConfig';
import { IApplePayRequest } from '../interfaces/ApplePayRequest';
function ApplePayRequest(requestData: IApplePayRequest) {
  return http.post('/applePay', requestData ).then((res) => {
    console.log("applePay Data" , requestData);
    if (res.status === 200) {
      return res.data;
    }
  }).catch((err)=>{
    throw new Error(err.response);
  });
}

export function useApplePay( options: UseMutationOptions<any, Error, IApplePayRequest, unknown> ) {
    return useMutation(ApplePayRequest, options);
}

function GoogleRequest(requestData: any) {
  return http.post('/googlePay', requestData ).then((res) => {
    console.log("googlePay Data" , requestData);
    if (res.status === 200) {
      return res.data;
    }
  }).catch((err)=>{
    throw new Error(err.response);
  });
}

export function useGooglePay( options: UseMutationOptions<any, Error, any, unknown> ) {
    return useMutation(GoogleRequest, options);
}