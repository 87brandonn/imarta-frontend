import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useUpdateAttributes = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: { id: number; data: any; slug: string }) => {
      const { data } = await axios.put(
        `/module/section/attribute/${payload.id}`,
        { data: payload.data }
      );
      return data;
    },
    {
      onSuccess: (data, { slug }) => {
        toast.success('Succesfully update attribute');
        client.invalidateQueries(['module', slug]);
      },
      onError: err => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};
export default useUpdateAttributes;
