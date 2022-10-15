import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useUpdateAttributes = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: { id: number; data: any; slug: string }) => {
      const { data } = await axios.put(
        `/module/section/attribute/${payload.id}`,
        payload.data
      );
      return data;
    },
    {
      onSuccess: (data, { slug }) => {
        client.invalidateQueries(['module', slug]);
      }
    }
  );
};
export default useUpdateAttributes;
