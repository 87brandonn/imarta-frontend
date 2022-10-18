import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Department } from '../types';

const useDepartmentsByPeriod = (id?: number) =>
  useQuery(
    ['department-period', id],
    async () => {
      const { data } = await axios.get<Department[]>(
        `/data/period/${id}/department`
      );
      return data;
    },
    {
      enabled: !!id
    }
  );

export default useDepartmentsByPeriod;
