import axios from '../../config/axios';
import { OrganizationMeta, OrganizationMetaMission, Period } from '../../types';

const getMetaById = async (id: number) => {
  const { data } = await axios.get<
    OrganizationMeta & {
      organizationMetaMissions: OrganizationMetaMission[];
      period: Period;
    }
  >(`/data/meta/${id}`);
  return data;
};

export default getMetaById;
