import { useQuery } from 'react-query';
import axios from '../config/axios';
import { OrganizationMeta, OrganizationMetaMission, Period } from '../types';
import { PaginatedApiResponseType } from '../types/api';

const useMetas = () =>
  useQuery(['meta'], async () => {
    const { data } = await axios.get<
      (OrganizationMeta & {
        organizationMetaMissions: OrganizationMetaMission[];
        period: Period;
      })[]
    >(`/data/meta`);
    return data;
  });

export default useMetas;
