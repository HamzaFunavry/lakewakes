export interface INotificationRequest {
    params?: Params;
}
interface Params {
    id?:number;
    tableName?: string;
}