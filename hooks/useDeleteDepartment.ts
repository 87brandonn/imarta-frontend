import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useDeleteDepartment = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: number) => {
      const { data } = await axios.delete(`/data/department/${payload}`);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success('Succesfully delete department');
        client.invalidateQueries(['department']);
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useDeleteDepartment;
