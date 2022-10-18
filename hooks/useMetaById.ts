import { useQuery } from 'react-query';
import getMetaById from '../services/api/getMetaById';

const useMetaById = (id: string) =>
  useQuery(['meta', id], () => getMetaById(parseInt(id, 10)), {
    enabled: !!id && id !== 'new'
  });

export default useMetaById;
