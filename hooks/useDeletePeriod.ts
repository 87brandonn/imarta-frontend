import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useDeletePeriod = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: number) => {
      const { data } = await axios.delete(`/data/period/${payload}`);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success('Succesfully delete period');
        client.invalidateQueries(['period']);
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useDeletePeriod;
