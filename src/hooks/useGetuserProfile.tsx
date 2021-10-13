import { useQuery, UseQueryOptions } from 'react-query';
import { http } from '../utils/axiosConfig';
function getUserProfileRequest<T>() {
  return http.get<T>('/getUserProfile').then((res) => {
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

export function usegetUserProfile<T>(
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    ['getUserProfile'],
    () => getUserProfileRequest<T>(),
    options,
  );
}

function getNotificationRequest<T>() {
  return http.get<T>('/getAllNotificationsForUser').then((res) => {
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

export function useGetNotification<T>(
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    ['getAllNotificationsForUser'],
    () => getNotificationRequest<T>(),
    options,
  );
}
