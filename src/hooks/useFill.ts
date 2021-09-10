import { useQuery, UseQueryOptions } from 'react-query';
// import { IFillDataRequest } from '../interfaces/FillDataRequest';
import { http } from '../utils/axiosConfig';

function fillRequest(requestData: any) {
  return http.post('/fillData', requestData).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not get fill data. Something went wrong');
    }
  }).catch((err)=>{
    console.log(err.response);
    throw new Error(err.response.data.message);
  });
}

export function useFill(
  requestData: any,
  options?: UseQueryOptions<any, Error, any>,
  key?: string,
) {
  return useQuery(
    ['fill', requestData.tableName, requestData.colName, key],
    () => fillRequest(requestData),
    options,
  );
}
