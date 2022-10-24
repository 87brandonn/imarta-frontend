import axios from '../../config/axios';
import { WorkProgramWithAssociation } from './getWorkPrograms';

const getWorkProgramById = async (id?: number) => {
  const { data } = await axios.get<WorkProgramWithAssociation>(
    `/data/work-program/${id}`
  );
  return data;
};

export default getWorkProgramById;
