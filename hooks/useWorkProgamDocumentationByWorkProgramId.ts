import { useQuery } from 'react-query';
import axios from '../config/axios';
import { WorkProgramDocumentation } from '../types';

const useWorkProgamDocumentationByWorkProgramId = (id?: number) =>
  useQuery(
    ['work-program-documentation', id],
    async () => {
      const { data } = await axios.get<WorkProgramDocumentation[]>(
        `/data/work-program/${id}/documentation`
      );
      return data;
    },
    {
      enabled: !!id
    }
  );

export default useWorkProgamDocumentationByWorkProgramId;
