import { useQuery } from 'react-query';
import axios from '../config/axios';
import { WorkProgramDocumentation } from './../types/index';

const useDocumentationById = (id?: number) =>
  useQuery(
    ['documentation', id],
    async () => {
      const { data } = await axios.get<WorkProgramDocumentation>(
        `/data/documentation/${id}`
      );
      return data;
    },
    {
      enabled: !!id
    }
  );

export default useDocumentationById;
