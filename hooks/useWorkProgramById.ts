import { useQuery } from 'react-query';
import getWorkProgramById from '../services/api/getWorkProgramById';

const useWorkProgramById = (id: string) =>
  useQuery(
    ['work-program', id],
    async () => getWorkProgramById(parseInt(id, 10)),
    {
      enabled: !!id && id !== 'new'
    }
  );

export default useWorkProgramById;
