import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../config/axios';

const useAddWorkProgramDocumentation = () => {
  const client = useQueryClient();
  return useMutation(
    async (payload: { workProgramId: number; imgUrl: string }) => {
      const { data } = await axios.post(
        `/data/work-program/${payload.workProgramId}/documentation`,
        {
          imgUrl: payload.imgUrl
        }
      );
      return data;
    },
    {
      onSuccess: (_, payload) => {
        toast.success('Succesfully add documentation');
        client.invalidateQueries([
          'work-program-documentation',
          payload.workProgramId
        ]);
      }
    }
  );
};

export default useAddWorkProgramDocumentation;
