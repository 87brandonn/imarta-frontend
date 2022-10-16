import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useDeleteMeta = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: number) => {
      const { data } = await axios.delete(`/data/meta/${payload}`);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success('Succesfully delete meta');
        client.invalidateQueries(['meta']);
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useDeleteMeta;
