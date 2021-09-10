export interface IGetTableRequest {
  pagination?: IPagination;
  params?: IParams;
  sort?: any[];
  filter?:IFilter[];
}

export interface IPagination {
  offset: number;
  limit: number;
}

export interface IParams {
  tableName: string;
  case?: string;
}
export interface IFilter {
  colName: string
  inputType: string
  properties: any
  value: number
  [key: string]: any
}

export interface IGetFilterRequest {
  params: IParams;
}
