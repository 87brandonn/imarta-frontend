import axios from '../../config/axios';
import {
  Department,
  WorkProgram,
  WorkProgramDepartment,
  WorkProgramDocumentation
} from '../../types';

const getDepartmentById = async (id: number) => {
  const { data } = await axios.get<
    Department & {
      workProgramDepartments: (WorkProgramDepartment & {
        workProgram: WorkProgram & {
          workProgramDocumentations: WorkProgramDocumentation[];
        };
      })[];
    }
  >(`/data/department/${id}`);
  return data;
};

export default getDepartmentById;
