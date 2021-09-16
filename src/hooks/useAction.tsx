import { useMutation, UseMutationOptions } from 'react-query';
import { http } from '../utils/axiosConfig';
import { IActionRequest } from '../interfaces/ActionRequest';
function actionRequest(requestData: IActionRequest) {
  return http.post('/action', requestData ).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not get action data. Something went wrong');
    }
  }).catch((err)=>{
    throw new Error(err.response.data.message);
  });
}

export function useAction(
    options: UseMutationOptions<any, Error, IActionRequest, unknown>,
  ) {
    return useMutation(actionRequest, options);
  }