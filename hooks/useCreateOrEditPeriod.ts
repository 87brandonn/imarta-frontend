import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import axios from '../config/axios';
import { Period } from './../types/index';

const useCreateOrEditPeriod = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(
    async (payload: Partial<Period>) => {
      const { data } = await axios.post(`/data/period`, payload);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success(
          `Sucessfully ${payload.id ? 'edit' : 'create'} period data`
        );
        if (payload.id) {
          client.invalidateQueries(['period', payload.id]);
        }
        client.invalidateQueries(['period']);
        router.push('/admin/data/period');
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useCreateOrEditPeriod;
