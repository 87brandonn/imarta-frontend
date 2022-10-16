import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useDeleteWorkProgram = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: number) => {
      const { data } = await axios.delete(`/data/work-program/${payload}`);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success('Succesfully delete work program');
        client.invalidateQueries(['work-program']);
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useDeleteWorkProgram;
