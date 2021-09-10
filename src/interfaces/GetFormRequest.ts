export interface IGetFormRequest {
  tableName: string;
  case: 'edit' | 'create';
  id?: number;
}
