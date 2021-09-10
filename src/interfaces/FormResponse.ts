export interface FormResponse {
  message: string;
  result: FormResult;
}

export interface FormResult {
  fields: Field[];
}

export interface Field {
  colName: string;
  label: string;
  tableName: string;
  inputType: string;
  value: string;
  properties: Properties;
  string: boolean;
  id: boolean;
  toBeFilled: boolean;
  readOnly: boolean;
  required: boolean;
  [x: string]: any;
}

export interface Properties {
  string: boolean;
  readOnly: boolean;
  required: boolean;
}
