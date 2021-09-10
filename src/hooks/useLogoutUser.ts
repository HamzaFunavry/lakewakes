import { useMutation, UseMutationOptions } from 'react-query';
import { LogoutResponse } from '../interfaces/LoginResponse';
import { getUniqueId } from 'react-native-device-info';
import { http } from '../utils/axiosConfig';
import { ILogoutRequest } from '../interfaces/LoginRequest';
import { ReactReduxContext } from 'react-redux';

function logoutUserRequest(logoutRequest: ILogoutRequest) {
  console.log("here");
  // set device id here
  logoutRequest.device = getUniqueId();
  console.log(logoutRequest);
  
  return http.post<LogoutResponse>('/logout').then((res) => {
    console.log('RES FOM PSOT',res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not Logout. Something went wrong');
    }
  });
}

export function useLogoutUser(
  options: UseMutationOptions<LogoutResponse, Error, ILogoutRequest, unknown>,
) {
  return useMutation(logoutUserRequest);
}
