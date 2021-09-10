export interface IGetQuestionResponse {
    message: string
    results: Result[]
}
  
export interface Result {
    id: number
    question: string
  }
  