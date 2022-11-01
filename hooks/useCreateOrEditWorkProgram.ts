import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';
import { WorkProgramPayload } from '../pages/admin/data/work-program/[id]';

const useCreateOrEditWorkProgram = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(
    async ({ period, ...payload }: WorkProgramPayload) => {
      const { data } = await axios.post(`/data/work-program`, {
        ...payload,
        participationCount: payload.participationCount,
        startDate: dayjs(payload.startDate).toDate(),
        endDate: dayjs(payload.endDate).toDate(),
        departments: payload.departments.map(dep => dep.id),
        fields: payload.fields.map(field => field.id),
        periodId: period.id
      });
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success(
          `Sucessfully ${payload.id ? 'edit' : 'create'} work program data`
        );
        if (payload.id) {
          client.invalidateQueries(['work-program', payload.id]);
        }
        client.invalidateQueries(['work-program']);
        router.push('/admin/data/work-program');
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useCreateOrEditWorkProgram;
