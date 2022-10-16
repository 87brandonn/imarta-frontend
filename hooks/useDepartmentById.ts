import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Department } from '../types';

const useDepartmentById = (id: string) =>
  useQuery(
    ['department', id],
    async () => {
      const { data } = await axios.get<Department>(`/data/department/${id}`);
      return data;
    },
    {
      enabled: !!id && id !== 'new'
    }
  );

export default useDepartmentById;
