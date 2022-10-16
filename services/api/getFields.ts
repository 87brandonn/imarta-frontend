import axios from '../../config/axios';
import { Department, Field } from '../../types';
import { PaginatedApiResponseType } from '../../types/api';

const getFields = async (params?: {
  limit?: number;
  page: number;
  search?: string;
}) => {
  const { data } = await axios.get<PaginatedApiResponseType<Field[]>>(
    `/data/field`,
    {
      params
    }
  );
  return data;
};

export default getFields;
