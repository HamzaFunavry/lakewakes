export interface LoginResponse {
  message: string;
  statusCode: string;
  data:User
}
export interface RegisterResponse {
  statusCode: string;
  message: User;
}

export interface LogoutResponse {
  message: string;
  results: User;
}

export interface ChangePasswordResponse {
  message: string;
  data:any;
  results: User;
}

export interface ForgotPasswordResponse {
  message: string;
  statusCode:number;
  data:any;
  results: User;
}

export interface User {
  createdAt?: string;
  email?: string;
  isAdmin?: number | string;
  name?: string;
  paymentStatus?: boolean | null;
  token?:string;
}
interface Priviliges {
  title: string
  type: number
}