import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { ChangePasswordResponse, ForgotPasswordResponse, LoginResponse, RegisterResponse } from '../interfaces/LoginResponse';
import { http } from '../utils/axiosConfig';
import { IChangePasswordRequest, IForgotPasswordCodeRequest, IForgotPasswordRequest, ILoginRequest, IRegisterRequest, IUpdateUserRequest } from '../interfaces/LoginRequest';


function loginUserRequest(loginRequest: ILoginRequest) {
  loginRequest.issuperadmin=false;
	loginRequest.dtoken='';
  return http.post<LoginResponse>('/login', loginRequest).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not Login. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err);
    if(err.response){
      throw new Error(err.response.data.message);
    }
    else{
      throw new Error(err);
    }
  })
}
export function useLoginUser(
  options: UseMutationOptions<LoginResponse, Error, ILoginRequest, unknown>,
) {
  return useMutation(loginUserRequest, options);
}

function registerUserRequest(registerRequest: IRegisterRequest) {
  return http.post<RegisterResponse>('/register', registerRequest).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not Register. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err.response);
    throw new Error(err.response.data.message);
  })
}
export function useRegisterUser(
  options: UseMutationOptions<RegisterResponse, Error, IRegisterRequest, unknown>,
) {
  return useMutation(registerUserRequest, options);
}

function ChangePasswordRequest(changepasswordRequest: IChangePasswordRequest) {
  console.log(changepasswordRequest);
  return http.post<ChangePasswordResponse>('/resetPassword', changepasswordRequest).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not change. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err.response);
    throw new Error(err.response.data.message);
  });
}
export function useChangePassword(
  options: UseMutationOptions<ChangePasswordResponse, Error, IChangePasswordRequest, unknown>,
) {
  return useMutation(ChangePasswordRequest, options);
}

function ForgotPasswordRequest(ForgotpasswordRequest: IForgotPasswordRequest) {
  console.log(ForgotpasswordRequest);
  return http.post<ForgotPasswordResponse>('/forgotPassword', ForgotpasswordRequest).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not Forgot. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err);
    throw new Error(err.response.data.message);
  });
}
export function useForgotPassword(
  options: UseMutationOptions<ForgotPasswordResponse, Error, IForgotPasswordRequest, unknown>,
) {
  return useMutation(ForgotPasswordRequest, options);
}

function ForgotPasswordCodeRequest(ForgotpasswordRequest: IForgotPasswordCodeRequest) {
  console.log(ForgotpasswordRequest);
  return http.post<ForgotPasswordResponse>('/passwordResetOnCode', ForgotpasswordRequest).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not Forgot. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err);
    throw new Error(err.response.data.message);
  });
}
export function useForgotPasswordCode(
  options: UseMutationOptions<ForgotPasswordResponse, Error, IForgotPasswordCodeRequest, unknown>,
) {
  return useMutation(ForgotPasswordCodeRequest, options);
}

function updateUserRequest(updateUserRequest: IUpdateUserRequest) {
  console.log(updateUserRequest);
  return http.post<any>('/updateUser', updateUserRequest).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not change. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err.response);
    throw new Error(err.response.data.message);
  });
}
export function useupdateUser(
  options?: UseMutationOptions<any, Error, IUpdateUserRequest, unknown>,
) {
  return useMutation(updateUserRequest, options);
}

