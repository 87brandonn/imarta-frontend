import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from '../config/axios';
import { WorkProgramDocumentation } from '../types';
import { PaginatedApiResponseType } from '../types/api';

export type DocumentationParams = {
  limit?: number;
  page: number;
  departments?: number[];
  fields?: number[];
  workPrograms?: number[];
};

const useDocumentations = (
  params?: DocumentationParams,
  options?: Omit<
    UseQueryOptions<
      PaginatedApiResponseType<WorkProgramDocumentation[]>,
      unknown,
      PaginatedApiResponseType<WorkProgramDocumentation[]>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery(
    ['documentations', params],
    async () => {
      const { data } = await axios.get<
        PaginatedApiResponseType<WorkProgramDocumentation[]>
      >(`/data/work-program-documentations`, { params });
      return data;
    },
    options
  );

export default useDocumentations;
