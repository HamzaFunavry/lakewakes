import { useMutation, UseMutationOptions } from 'react-query';
import { http } from '../utils/axiosConfig';
import { INotificationReadRequest } from '../interfaces/NotificationReadRequest';
function notificationReadRequest(requestData: INotificationReadRequest) {
  return http.post('/readnotifications', requestData ).then((res) => {
    console.log("Notification Read Request Data" , requestData);
    if (res.status === 200) {
      return res.data;
    } else {
      console.log('Could not get action data. Something went wrong');
      throw new Error('Could not get action data. Something went wrong');
    }
  }).catch((err)=>{
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    throw new Error(err.response.data.message);
  });
}

export function useNotificationRead( options: UseMutationOptions<any, Error, INotificationReadRequest, unknown> ) 
{
    return useMutation(notificationReadRequest, options);
}