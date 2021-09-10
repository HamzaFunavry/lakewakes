import { useMutation, UseMutationOptions } from 'react-query';
import { createEmployeeRequest, createEmployerRequest } from '../interfaces/CreateUserRequest';
import { CreateUserEmployeeResponse , CreateUserEmployerResponse} from '../interfaces/CreateUserResponse'
import { http } from '../utils/axiosConfig';


function createUserEmployee(createEmployee : createEmployeeRequest) {
    console.log("INside createUserEmployyee" , createEmployee);

    return http.post<CreateUserEmployeeResponse>('/register', createEmployee).then((res) => {
        console.log('Response from Post',res);
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error('Could not Register. Something went wrong');
        }
      }).catch((err)=>{ 
        console.log(err.response);
        throw new Error(JSON.stringify(err.response) );
      });
}

function createUserEmployer(createEmployer : createEmployerRequest) {
  console.log("INside createUserEmployer" , createEmployer);

  return http.post<CreateUserEmployerResponse>('/register', createEmployer).then((res) => {
      console.log('Response from Post',res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error('Could not Register. Somethißng went wrong');
      }
    }).catch((err)=>{ 
      console.log(err.response);
      throw new Error(JSON.stringify(err.response) );
    });
}


export function useCreateUserEmployee(
    options: UseMutationOptions<CreateUserEmployeeResponse, Error, createEmployeeRequest, unknown>,
  ) {
    return useMutation(createUserEmployee, options);
  }

  export function useCreateUserEmployer(
    options: UseMutationOptions<CreateUserEmployerResponse, Error, createEmployerRequest, unknown>,
  ) {
    return useMutation(createUserEmployer, options);
  }