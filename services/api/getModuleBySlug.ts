import axios from '../../config/axios';
import { Module, Section, Attribute } from '../../types';

export type ModuleWithAssociation = Module & {
  sections: (Section & {
    attributes: Attribute[];
  })[];
};

const getModuleBySlug = async (slug?: string) => {
  const { data } = await axios.get<ModuleWithAssociation>(`/module/${slug}`);
  return data;
};

export default getModuleBySlug;
