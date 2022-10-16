import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';
import { Department } from '../types';

const useCreateOrEditDepartment = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(
    async (payload: Partial<Department>) => {
      const { data } = await axios.post(`/data/department`, payload);
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success(
          `Sucessfully ${payload.id ? 'edit' : 'create'} department data`
        );
        if (payload.id) {
          client.invalidateQueries(['department', payload.id]);
        }
        client.invalidateQueries(['department']);
        router.push('/admin/data/department');
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useCreateOrEditDepartment;
