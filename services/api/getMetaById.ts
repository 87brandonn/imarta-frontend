import axios from '../../config/axios';
import { OrganizationMeta, OrganizationMetaMission, Period } from '../../types';

export type OrganizationMetaWithAssociation = OrganizationMeta & {
  organizationMetaMissions: OrganizationMetaMission[];
  period: Period;
};

const getMetaById = async (id: number) => {
  const { data } = await axios.get<OrganizationMetaWithAssociation>(
    `/data/meta/${id}`
  );
  return data;
};

export default getMetaById;
