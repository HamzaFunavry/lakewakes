export interface IFileUploadResponse {
  message: string;
  result: Result;
}
interface Result {
  key: string;
  bucketUrl: string;
  signedURL: string;
  fileId: number;
}
