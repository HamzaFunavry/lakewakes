export interface IFillSaveJobTableResponse{
    message: string;
    result: savedJobInfo;

}
interface savedJobInfo{
    jobId: any;
    employeeId: any;
    employerId: any;
    id:any;
    updatedAt: Date;
    createdAt: Date;

}