//@ts-nocheck

/**
 * Model Module
 *
 */
export type Module = {
  id: number;
  slug: string;
  name: string;
};

/**
 * Model Section
 *
 */
export type Section = {
  id: number;
  label: string;
  name: string;
  moduleId: number;
};

/**
 * Model Attribute
 *
 */
export type Attribute = {
  id: number;
  name: string;
  label: string;
  type: AttributeType;
  data: Prisma.JsonValue | null;
  sectionId: number;
};

/**
 * Model Period
 *
 */
export type Period = {
  id: number;
  label: string;
};

/**
 * Model Department
 *
 */
export type Department = {
  id: number;
  name: string;
  leader: string | null;
};

/**
 * Model Field
 *
 */
export type Field = {
  id: number;
  name: string;
  leader: string | null;
};

/**
 * Model WorkProgram
 *
 */
export type WorkProgram = {
  id: number;
  periodId: number | null;
  name: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  participationCount: number | null;
  collaborators: string | null;
  staffs: string | null;
};

/**
 * Model WorkProgramDepartment
 *
 */
export type WorkProgramDepartment = {
  workProgramId: number;
  departmentId: number;
};

/**
 * Model WorkProgramField
 *
 */
export type WorkProgramField = {
  workProgramId: number;
  fieldId: number;
};

/**
 * Model WorkProgramDocumentation
 *
 */
export type WorkProgramDocumentation = {
  id: number;
  imgUrl: string;
  workProgramId: number;
};

/**
 * Model OrganizationMeta
 *
 */
export type OrganizationMeta = {
  id: number;
  periodId: number;
  vision: string;
  hierarchyImgUrl: string;
};

/**
 * Model OrganizationMetaMission
 *
 */
export type OrganizationMetaMission = {
  id: number;
  organizationMetaId: number;
  value: string;
  number: number;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const AttributeType: {
  TITLE: 'TITLE';
  SUBTITLE: 'SUBTITLE';
  TEXT: 'TEXT';
  SWIPER_CENTERED: 'SWIPER_CENTERED';
  SWIPER_NORMAL: 'SWIPER_NORMAL';
  IMAGE_BIG: 'IMAGE_BIG';
  IMAGE_SMALL: 'IMAGE_SMALL';
  IMAGE_GRID: 'IMAGE_GRID';
  HERO: 'HERO';
  HOME_EVENTS: 'HOME_EVENTS';
};

export type AttributeType = typeof AttributeType[keyof typeof AttributeType];
