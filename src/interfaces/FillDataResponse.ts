export interface IFillDataResponse {
  message: string;
  result: Result;
}

interface Result {
  data: Data;
}

interface Data {
  colName: string;
  label: string;
  tableName: string;
  inputType: string;
  required: boolean;
  value: any;
  properties: Properties;
}

interface Properties {
  string: boolean;
  id: boolean;
  toBeFilled: boolean;
  readOnly: boolean;
  required: boolean;
  data: PropertyData[];
  propertyToBind: string;
  propertyToShow: string;
  config: Config;
}

interface PropertyData {
  id: number;
  name: string;
}

interface Config {
  type: string;
  limit: string;
  tableName: string;
}
