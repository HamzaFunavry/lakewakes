import { DocumentPickerResponse } from 'react-native-document-picker';
import { ImagePickerResponse } from 'react-native-image-picker';
export interface IUploadFileRequest {
  // the file path in the device
  file: DocumentPickerResponse;
  type?: string;
}

export interface IUploadCameraRequest {
  // the file path in the device
  file: ImagePickerResponse;
  type?: string;
}

export interface IUploadUrlRequest {
  link :string;
  date: Date;
}

export interface IUploadProfileResponse{
  message: string;
  result: Result;
}

export interface Result {
  key: string;
  bucketUrl: string;
  signedURL: string;
  fileId: number;
}
