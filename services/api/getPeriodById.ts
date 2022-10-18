import axios from '../../config/axios';
import { Period } from '../../types';

const getPeriodById = async (id: number) => {
  const { data } = await axios.get<Period>(`/data/period/${id}`);
  return data;
};

export default getPeriodById;
