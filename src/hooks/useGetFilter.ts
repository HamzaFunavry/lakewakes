import { useQuery, UseQueryOptions } from 'react-query';
import { IGetFilterRequest } from '../interfaces/GetTableRequest';
import { http } from '../utils/axiosConfig';

function getFilterRequest<T>(requestData: IGetFilterRequest) {
  return http.post<T>('/getFilters', requestData).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not get form data. Something went wrong');
    }
  }).catch((err)=>{
    console.log('err');
    
    console.log(err.response);
    throw new Error(err.response.data.message);
  });
}

export function useGetFilter<T>( requestData: IGetFilterRequest, options?: UseQueryOptions<T, Error, T> ) {
  console.log(genFilterKey(requestData.params.tableName));
  return useQuery(
    genFilterKey(requestData.params.tableName),
    () => getFilterRequest<T>(requestData),
    options,
  );
}

export function genFilterKey(tableName: string) {
  return ['get', 'filter', tableName];
}
