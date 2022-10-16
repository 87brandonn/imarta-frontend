import { useQuery } from 'react-query';
import getDepartments from '../services/api/getDepartments';

const useDepartments = (params?: {
  limit?: number;
  page: number;
  search?: string;
}) => useQuery(['department', params], () => getDepartments(params));

export default useDepartments;
