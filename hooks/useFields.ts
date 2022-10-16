import { useQuery } from 'react-query';
import axios from '../config/axios';
import getFields from '../services/api/getFields';
import { Field } from '../types';
import { PaginatedApiResponseType } from '../types/api';

const useFields = (params?: { limit: number; page: number }) =>
  useQuery(['fields', params], () => getFields(params));

export default useFields;
