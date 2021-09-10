import { useQuery, UseQueryOptions } from 'react-query';
import {
  IGetS3FileProxyRequest,
  IGetS3FileProxyResponse,
} from '../interfaces/S3FileProxy';
import { http } from '../utils/axiosConfig';

function getS3FileProxyRequest(requestData: IGetS3FileProxyRequest) {
  return http
    .post<IGetS3FileProxyResponse>('/s3fileproxy', requestData)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error('Could not get form data. Something went wrong');
      }
    });
}

export function useGetS3FileProxy(
  requestData: IGetS3FileProxyRequest,
  options?: UseQueryOptions<
    IGetS3FileProxyResponse,
    Error,
    IGetS3FileProxyResponse
  >,
) {
  return useQuery(
    ['s3', requestData.fileKey],
    () => getS3FileProxyRequest(requestData),
    options,
  );
}
