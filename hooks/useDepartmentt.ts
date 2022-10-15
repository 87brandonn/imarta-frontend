import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Department } from '../types';

const useDepartments = () =>
  useQuery(['department'], async () => {
    const { data } = await axios.get<Department[]>(`/data/department`);
    return data;
  });

export default useDepartments;
