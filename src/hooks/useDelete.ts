import { useMutation, UseMutationOptions } from 'react-query';
import { IDeleteRequest } from '../interfaces/DeleteRequest';
import { http } from '../utils/axiosConfig';

function deleteRequest(requestData: IDeleteRequest) {
  return http.post('/delete', requestData).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not delete. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err.response);
    throw new Error(err.response.data.message);
  });
}

export function useDelete(
  options?: UseMutationOptions<any, Error, IDeleteRequest, unknown>,
) {
  return useMutation(deleteRequest, options);
}
