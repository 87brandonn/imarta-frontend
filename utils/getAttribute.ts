import { ModuleWithAssociation } from '../services/api/getModuleBySlug';

const getAttribute = <T>(
  moduleData: ModuleWithAssociation,
  sectionName: string,
  attributeName?: string
): T => {
  const sectionData = moduleData.sections.find(
    section => section.name === sectionName
  );
  if (attributeName) {
    return sectionData?.attributes.find(attr => attr.name === attributeName)
      ?.data;
  }
  return sectionData as T;
};

export default getAttribute;
