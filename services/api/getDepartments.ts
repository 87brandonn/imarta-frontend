import axios from '../../config/axios';
import { Department } from '../../types';
import { PaginatedApiResponseType } from '../../types/api';

const getDepartments = async (params?: {
  limit?: number;
  page: number;
  search?: string;
}) => {
  const { data } = await axios.get<PaginatedApiResponseType<Department[]>>(
    `/data/department`,
    {
      params
    }
  );
  return data;
};

export default getDepartments;
