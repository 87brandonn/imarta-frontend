import { useCallback } from 'react';
import getFields from '../../services/api/getFields';
import getWorkPrograms from '../../services/api/getWorkPrograms';

const useLoadWorkPrograms = (limit?: number) => {
  const loadWorkPrograms = useCallback(
    async (search: string, _: any, { page: additionalPage }: any) => {
      const data = await getWorkPrograms({
        name: search || undefined,
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
  return loadWorkPrograms;
};

export default useLoadWorkPrograms;
