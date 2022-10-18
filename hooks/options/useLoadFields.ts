import { useCallback } from 'react';
import getFields from '../../services/api/getFields';

const useLoadFields = (limit?: number) => {
  const loadFields = useCallback(
    async (search: string, _: any, { page: additionalPage }: any) => {
      const data = await getFields({
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
  return loadFields;
};

export default useLoadFields;
