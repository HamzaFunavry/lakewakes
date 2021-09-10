import { useQuery, UseQueryOptions } from 'react-query';
import { IGetFormRequest } from '../interfaces/GetFormRequest';
import { http } from '../utils/axiosConfig';

function getFormRequest<T>(requestData: IGetFormRequest) {
  return http
    .post<T>('/getform', { params: requestData })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error('Could not get form data. Something went wrong');
      }
    }).catch((err)=>{
      console.log(err.response);
      throw new Error(err.response.data.message);
    });
}

export function useGetForm<T>(
  requestData: IGetFormRequest,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    ['get', 'form', requestData.tableName, requestData.id ?? 'noId'],
    () => getFormRequest<T>(requestData),
    options,
  );
}
