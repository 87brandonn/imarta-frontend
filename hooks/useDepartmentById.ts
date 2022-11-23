import { useQuery } from 'react-query';
import getDepartmentById from '../services/api/getDepartmentById';

const useDepartmentById = (id: string, search?: string) =>
  useQuery(
    ['department', id, { search }],
    () => getDepartmentById(parseInt(id, 10), search),
    {
      enabled: !!id && id !== 'new'
    }
  );

export default useDepartmentById;
