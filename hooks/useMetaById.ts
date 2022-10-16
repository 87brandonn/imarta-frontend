import { useQuery } from 'react-query';
import axios from '../config/axios';
import {
  Department,
  OrganizationMeta,
  OrganizationMetaMission,
  Period
} from '../types';

const useMetaById = (id: string) =>
  useQuery(
    ['meta', id],
    async () => {
      const { data } = await axios.get<
        OrganizationMeta & {
          organizationMetaMissions: OrganizationMetaMission[];
          period: Period;
        }
      >(`/data/meta/${id}`);
      return data;
    },
    {
      enabled: !!id && id !== 'new'
    }
  );

export default useMetaById;
