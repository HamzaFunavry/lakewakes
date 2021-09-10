import { useQuery, UseQueryOptions } from 'react-query';
import { IFillSaveJobTableRequest } from '../interfaces/FillSaveJobTableRequest';
import { http } from '../utils/axiosConfig';

function fillRequest(requestData: any) {
  return http.post('/fillData', requestData).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not get fill data. Something went wrong');
    }
  });
}

export function useSavedEmployeeJobs(
  requestData: IFillSaveJobTableRequest,
  options?: UseQueryOptions<any, Error, any>,
  key?: string,
) {
  return useQuery(
    ['fill', requestData.tableName],
    () => fillRequest(requestData),
    options,
  );
}
