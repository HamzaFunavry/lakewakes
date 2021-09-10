export interface IGetS3FileProxyResponse {
  result: Result;
}

interface Result {
  linkToFile: string;
}

export interface IGetS3FileProxyRequest {
  fileKey: string;
}
