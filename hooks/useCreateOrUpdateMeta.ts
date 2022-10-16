import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../config/axios';
import {
  Field,
  OrganizationMeta,
  OrganizationMetaMission,
  Period
} from './../types/index';

export type CreateOrUpdateMetaPayload = Partial<OrganizationMeta> & {
  missions: Partial<OrganizationMetaMission>[];
  period: Period;
};

const useCreateOrEditMeta = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(
    async ({ period, missions, ...payload }: CreateOrUpdateMetaPayload) => {
      const { data } = await axios.post(`/data/meta`, {
        ...payload,
        periodId: period.id,
        missions: missions.map(mission => mission.value)
      });
      return data;
    },
    {
      onSuccess: (data, payload) => {
        toast.success(
          `Sucessfully ${payload.id ? 'edit' : 'create'} meta data`
        );
        if (payload.id) {
          client.invalidateQueries(['meta', payload.id]);
        }
        client.invalidateQueries(['meta']);
        router.push('/admin/data/meta');
      },
      onError: () => {
        toast.error('Something went wrong. Please try again');
      }
    }
  );
};

export default useCreateOrEditMeta;
