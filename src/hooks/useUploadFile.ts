import { useMutation, UseMutationOptions } from 'react-query';
import { User } from '../interfaces/LoginResponse';
import { IFileUploadResponse } from '../interfaces/FileUploadResponse';
import { IUploadFileRequest,IUploadCameraRequest, IUploadUrlRequest, IUploadProfileResponse } from '../interfaces/FileUploadRequest';
import RNFetchBlob from 'rn-fetch-blob';
import { SERVER_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userKey } from '../store/userSlice';
import { Platform } from 'react-native';
import { http } from '../utils/axiosConfig';

async function uploadFileRequest(req: IUploadFileRequest) {
  console.log(req.file.uri);
  let userData = await AsyncStorage.getItem(userKey);
  const uri = req.file.uri;
  const realPath = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const parsedUser: User = JSON.parse(userData);
  const form = [
    // append field data from file path
    {
      name: 'file',
      filename: req.file.name,
      type: req.file.type,
      // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
      // Or simply wrap the file path with RNFetchBlob.wrap().
      data: RNFetchBlob.wrap(decodeURIComponent(realPath)),
    },
    { name: 'title', data: req.file.name },
    { name: 'date', data: new Date() },
  ];

  console.log(form);

  return RNFetchBlob.fetch(
    'POST',
    `${SERVER_URL}/uploadfile`,
    {
      Authorization: parsedUser.sessionToken,
      // this is required, otherwise it won't be process as a multipart/form-data request
      'Content-Type': 'multipart/form-data',
    },
    form,
  ).then((resp) => {
    // ...
    const res: IFileUploadResponse = JSON.parse(resp.data);

    return res;
  });
}

async function uploadFileRequestCamera(req: IUploadCameraRequest) {
  console.log(req.file.uri);
  let userData = await AsyncStorage.getItem(userKey);
  const uri = req.file.uri;
  const realPath = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const parsedUser: User = JSON.parse(userData);
  const form = [
    // append field data from file path
    {
      name: 'file',
      filename: req.file.fileName,
      type: req.file.type,
      // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
      // Or simply wrap the file path with RNFetchBlob.wrap().
      data: RNFetchBlob.wrap(decodeURIComponent(realPath)),
    },
    { name: 'title', data: req.file.fileName },
    { name: 'date', data: new Date() },
  ];

  console.log(form);

  return RNFetchBlob.fetch(
    'POST',
    `${SERVER_URL}/uploadfile`,
    {
      Authorization: parsedUser.sessionToken,
      // this is required, otherwise it won't be process as a multipart/form-data request
      'Content-Type': 'multipart/form-data',
    },
    form,
  ).then((resp) => {
    // ...
    const res: IFileUploadResponse = JSON.parse(resp.data);

    return res;
  });
}

async function uploadProfileRequestCamera(req: IUploadCameraRequest) {
  console.log(req.file.uri);
  const uri = req.file.uri;
  const realPath = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const form = [
    // append field data from file path
    {
      name: 'file',
      filename: req.file.fileName,
      type: req.file.type,
      // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
      // Or simply wrap the file path with RNFetchBlob.wrap().
      data: RNFetchBlob.wrap(decodeURIComponent(realPath)),
    },
  ];

  console.log(form);

  return RNFetchBlob.fetch(
    'POST',
    `${SERVER_URL}/uploadfile`,
    {
      // this is required, otherwise it won't be process as a multipart/form-data request
      'Content-Type': 'multipart/form-data',
    },
    form,
  ).then((resp) => {
    // ...
    const res: IUploadProfileResponse = JSON.parse(resp.data);

    return res;
  });
}

async function uploadUrlLinkRequest(req: IUploadUrlRequest) {
  return http.post('/uploadlink', req).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Could not delete. Something went wrong');
    }
  });
}


export function useUploadFile(
  options: UseMutationOptions<
    IFileUploadResponse,
    Error,
    IUploadFileRequest,
    unknown
  >,
) {
  return useMutation(uploadFileRequest, options);
}

export function useUploadFileCamera(
  options: UseMutationOptions<
    IFileUploadResponse,
    Error,
    IUploadCameraRequest,
    unknown
  >,
) {
  return useMutation(uploadFileRequestCamera, options);
}

export function uploadUrlLink(
  options: UseMutationOptions<
    IFileUploadResponse,
    Error,
    IUploadUrlRequest,
    unknown
  >,
) {
  return useMutation(uploadUrlLinkRequest, options);
}

export function useUploadProfileCamera(
  options: UseMutationOptions<
    IUploadProfileResponse,
    Error,
    IUploadCameraRequest,
    unknown
  >,
) {
  return useMutation(uploadProfileRequestCamera, options);
}
