import { useQuery, UseQueryOptions } from 'react-query';
import { IGetTableRequest } from '../interfaces/GetTableRequest';
import { INotificationRequest } from '../interfaces/NotificationRequest';
import { http } from '../utils/axiosConfig';

function NotificationRequest<T>(requestData: INotificationRequest) {
  return http.post<T>('/getnotifications', requestData).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not get form data. Something went wrong');
    }
  });
}

export function useNotification<T>(
  requestData: INotificationRequest,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    genTableKey(requestData.params.tableName),
    () => NotificationRequest<T>(requestData),
    options,
  );
}

export function genTableKey(tableName: string) {
  return ['get', 'notification', tableName];
}
