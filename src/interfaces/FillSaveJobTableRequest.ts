export interface IFillSaveJobTableRequest{
  tableName : string;
  data: EmployerEmployeeJobData
}

interface EmployerEmployeeJobData{
    employeeId: any;
    employerId: any;
    jobId: any;
}