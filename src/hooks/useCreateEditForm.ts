import { useMutation, UseMutationOptions } from 'react-query';
import { ICreateEditFormRequest } from '../interfaces/CreateEditFormRequest';
import { http } from '../utils/axiosConfig';

function createEditFormRequest(requestData) {
  console.log(requestData);
  return http.post('/createEdit', { params: requestData }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not set form data. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err.response);
    throw new Error(err.response.data.message);
  });
}

export function useCreateEditForm(
  options?: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(createEditFormRequest, options);
}
