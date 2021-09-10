import { CreateEmployeeRequest_EmployeeData} from "../interfaces/CreateUserRequest";

export interface CreateUserEmployeeResponse {
    message: string;
    results: CreateEmployeeRequest_EmployeeData;
}

export interface CreateUserEmployerResponse {
    message: string;
    results: Result;
}

export interface Result {
    name: string
    hrcontact: string
    country: string
    state: string
    city: string
    address: string
    userId: number
    id: number
    updatedAt: string
    createdAt: string
  }