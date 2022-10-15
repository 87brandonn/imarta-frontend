import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Field } from '../types';

const useFields = () =>
  useQuery(['fields'], async () => {
    const { data } = await axios.get<Field[]>(`/data/field`);
    return data;
  });

export default useFields;
