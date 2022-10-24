import { useQuery } from 'react-query';
import getModuleBySlug from '../services/api/getModuleBySlug';

const useFloatingFooter = () =>
  useQuery(['floating-footer'], async () => {
    const data = await getModuleBySlug('floating-footer');
    return data;
  });

export default useFloatingFooter;
