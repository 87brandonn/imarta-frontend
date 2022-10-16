import { Field } from './../types/index';
import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Department } from '../types';

const useFieldById = (id: string) =>
  useQuery(
    ['field', id],
    async () => {
      const { data } = await axios.get<Field>(`/data/field/${id}`);
      return data;
    },
    {
      enabled: !!id && id !== 'new'
    }
  );

export default useFieldById;
