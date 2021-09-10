import { useQuery, UseQueryOptions } from 'react-query';
import { IGetTableRequest } from '../interfaces/GetTableRequest';
import { http } from '../utils/axiosConfig';

function getTableRequest<T>(requestData: IGetTableRequest) {
  return http.post<T>('/tableView', requestData).then((res) => {
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

export function useGetTable<T>(
  requestData: IGetTableRequest,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    genTableKey(requestData.params.tableName),
    () => getTableRequest<T>(requestData),
    options,
  );
}

export function genTableKey(tableName: string) {
  return ['get', 'table', tableName];
}
