import { Field } from '../interfaces/FormResponse';

export interface ICreateEditFormRequest {
  tableName: string;
  id?: number;
  fields: Field[];
}
