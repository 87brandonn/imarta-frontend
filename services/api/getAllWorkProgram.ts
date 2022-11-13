import axios from '../../config/axios';
import { WorkProgramParams } from '../../hooks/useWorkProgram';
import { WorkProgram } from '../../types';

const getAllWorkProgram = async () => {
  const { data } = await axios.get<WorkProgram[]>(`/data/work-program/all`);
  return data;
};

export default getAllWorkProgram;
