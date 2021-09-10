import { useQuery, UseQueryOptions } from 'react-query';
import { IGetFormRequest } from '../interfaces/GetFormRequest';
import { http } from '../utils/axiosConfig';


function getQuestionRequest<T>() {
  return http.get<T>('/questions')
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error('Could not get form data. Something went wrong');
      }
    }).catch((err)=>{
      console.log(err.response);
      throw new Error(err.response.data.message);
    });
}

export function useGetQuestions<T>(
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(
    ['getQuestions'],
    () => getQuestionRequest<T>(),
    options,
  );
}


