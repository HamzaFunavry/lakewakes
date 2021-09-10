export interface IFillDataRequest {
  colName: string;
  label: string;
  tableName: string;
  inputType: string;
  required: boolean;
  value: any;
  properties: Properties;
}

export interface Properties {
  string: boolean;
  id: boolean;
  toBeFilled: boolean;
  readOnly: boolean;
  required: boolean;
  data: Data[];
  propertyToBind: string;
  propertyToShow: string;
  config: Config;
}

interface Data {
  id: number;
  name: string;
}

interface Config {
  type: string;
  limit: string;
  tableName: string;
}
