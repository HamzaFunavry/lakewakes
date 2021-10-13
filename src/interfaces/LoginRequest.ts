export interface ILoginRequest {
  email: string;
  password: string;
  issuperadmin?:boolean;
  dtoken?:string
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password:string;
}

export interface IChangePasswordRequest {
  oldpassword: string
  newpassword: string
  userid?: string
}

export interface IForgotPasswordRequest {
  email: string
}

export interface IForgotPasswordCodeRequest {
  code: string;
  password:string;
}

export interface IUpdateUserRequest {
  id?: string
  name?: string
  email?: string
}

export interface ILogoutRequest {
  device?: string;
}

export interface IemergencyRequest{
  longt:string;
	lat:string;
}