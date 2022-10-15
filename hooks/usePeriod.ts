import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Attribute, Module, Period, Section } from '../types';

const usePeriod = () =>
  useQuery(['period'], async () => {
    const { data } = await axios.get<Period[]>(`/data/period`);
    return data;
  });

export default usePeriod;
