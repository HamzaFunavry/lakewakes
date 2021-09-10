export interface IProfileFormResponse {
  message: string;
  result: Result;
}
interface Result {
  fields: Field[];
}

interface Field {
  colName: string;
  label: string;
  tableName: string;
  inputType: string;
  value: any;
  properties: Properties;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  maxDate?: string;
  csc?: boolean;
  countryCode: any;
  stateCode: any;
}

interface Properties {
  string?: boolean;
  disabled?: boolean;
  relation?: boolean;
  id?: boolean;
  data?: Data[];
  propertyToBind?: string;
  propertyToShow?: string;
  dateTime?: boolean;
  toBeFilled?: boolean;
  frontendMapping?: boolean;
  foriegnKey?: boolean;
  colName?: string;
  tableName?: string;
}

interface Data {
  id: number;
  name: string;
}
