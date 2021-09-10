export interface IGetTableResponse {
  message: string;
  result: IResult;
}

interface IResult {
  data: IData;
}

interface IData {
  count: number;
  rows: IRow[];
  attributes: IAttributes;
}

interface IRow {
  id: number;
  [x: string]: any;
}

interface IAttributes {
  columnNames: string[];
  attributes: IAttribute[];
}

interface IAttribute {
  colName: string;
  label: string;
  type: string;
  properties?: string[];
}
