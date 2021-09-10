export interface createEmployeeRequest{
    type : string;
    data : CreateEmployeeRequest_EmployeeData;
}

export interface CreateEmployeeRequest_EmployeeData{
    city: string;
    country: string;
    dob: string;       
    firstName: string;
    lastName: string;
    middleName: string;
    pds_future: string;
    pronouns:string;
    races:string[];
    state: string;
    title:string;
    user : CreateEmployeeRequest_EmployeeData_User;
}

export interface CreateEmployeeRequest_EmployeeData_User{
    confirmPassword: string;
    email: string;
    password: string;
    phoneNumber: string;
    photo?: string;
}

// Employer Interface
export interface createEmployerRequest{
    type : string;
    data : CreateEmployerRequest_EmployerData;
}

export interface CreateEmployerRequest_EmployerData{
    address:string,
    city: string;
    country: string;
    hrcontact:string;
    name:string;
    package:string;
    pds_future:string;
    state:string;
    user : CreateEmployerRequest_EmployerData_User;
}

export interface CreateEmployerRequest_EmployerData_User{
    confirmPassword: string;
    email: string;
    password: string;
    photo?: string;
}