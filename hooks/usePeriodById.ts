import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Period } from '../types';

const usePeriodById = (id?: number) =>
  useQuery(
    ['period', id],
    async () => {
      const { data } = await axios.get<Period>(`/data/period/${id}`);
      return data;
    },
    {
      enabled: !!id
    }
  );

export default usePeriodById;
