import { useQuery } from 'react-query';
import axios from '../config/axios';
import getDepartmentById from '../services/api/getDepartmentById';
import { Department } from '../types';

const useDepartmentById = (id: string) =>
  useQuery(['department', id], () => getDepartmentById(parseInt(id, 10)), {
    enabled: !!id && id !== 'new'
  });

export default useDepartmentById;
