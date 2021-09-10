export interface IActionRequest {
    params?: Params;
  }
  
  interface Params {
    data?:Id;
    tableName?: string;
  }
  interface Id{
    id?: number;
    hostEmployeeId?: number
    hostEmployerId?: number
    hostServiceProviderId?: number
    participantEmployeeId?: number
    trainingId?: number
    employeeId?: number,
    employerId?: number,
    jobId?: number,
    fileId?:number,
    typeOfResume?:string,
    interviewDate?:any,
    link?:string,
    message?:string,
    serviceId?:number,
    serviceProviderId?:number,
    timezone?:string,
  }