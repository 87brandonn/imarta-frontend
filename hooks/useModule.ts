import { useQuery } from 'react-query';
import getModuleBySlug from '../services/api/getModuleBySlug';

const useModule = (slug?: string) =>
  useQuery(['module', slug], () => getModuleBySlug(slug), {
    enabled: !!slug
  });

export default useModule;
