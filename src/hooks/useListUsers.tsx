import { useQuery, UseQueryOptions } from 'react-query';
import { IGetTableRequest } from '../interfaces/GetTableRequest';
import { http } from '../utils/axiosConfig';

function getUserListRequest<T>(requestData: IGetTableRequest) {
  return http.post<T>('/listusers', requestData).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not get form data. Something went wrong');
    }
  });
}

export function useListUsers<T>(
  requestData: IGetTableRequest,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    genTableKey(),
    () => getUserListRequest<T>(requestData),
    options,
  );
}

export function genTableKey() {
  return ['get', 'userlist', 'Manage User'];
}