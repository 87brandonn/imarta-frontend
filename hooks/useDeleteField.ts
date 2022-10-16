import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useDeleteField = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: number) => {
      const { data } = await axios.delete(`/data/field/${payload}`);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success('Succesfully delete field');
        client.invalidateQueries(['field']);
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useDeleteField;
