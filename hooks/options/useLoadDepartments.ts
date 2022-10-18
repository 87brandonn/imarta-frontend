import { useCallback } from 'react';
import getDepartments from '../../services/api/getDepartments';

const useLoadDepartments = (limit?: number) => {
  const loadDepartments = useCallback(
    async (search: string, _: any, { page: additionalPage }: any) => {
      const data = await getDepartments({
        search: search || undefined,
        page: additionalPage,
        limit
      });

      return {
        options: data.data,
        hasMore: data.meta.page < data.meta.totalPage,
        additional: {
          page: data.meta.page
        }
      };
    },
    [limit]
  );
  return loadDepartments;
};

export default useLoadDepartments;
