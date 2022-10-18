import axios from '../../config/axios';
import { Department } from '../../types';

const getDepartmentById = async (id: number) => {
  const { data } = await axios.get<Department>(`/data/department/${id}`);
  return data;
};

export default getDepartmentById;
