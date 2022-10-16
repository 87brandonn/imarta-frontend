import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../config/axios';
import { Field } from './../types/index';

const useCreateOrEditField = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(
    async (payload: Partial<Field>) => {
      const { data } = await axios.post(`/data/field`, payload);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success(
          `Sucessfully ${payload.id ? 'edit' : 'create'} field data`
        );
        if (payload.id) {
          client.invalidateQueries(['field', payload.id]);
        }
        client.invalidateQueries(['field']);
        router.push('/admin/data/field');
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useCreateOrEditField;
