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
      // onMutate: async ({ slug, id }) => {
      //   await client.cancelQueries(['module', slug]);

      //   // Snapshot the previous value
      //   const previousTodos = client.getQueryData(['todos']);

      //   // Optimistically update to the new value
      //   client.setQueryData<ModuleWithAssociation[]>(['module', slug], old => {
      //     const previousData = Array.from(old || []);
      //     previousData.forEach(module => {
      //       if(module.slug === slug) {

      //       }
      //     })
      //     // const adjustedModule = previousData.find(
      //     //   module => module.slug === slug
      //     // );
      //     // const modifiedSection = adjustedModule?.sections.find(section =>
      //     //   section.attributes.some(attr => attr.id === id)
      //     // );
      //     // const modifiedAttributes = modifiedSection
      //   });

      //   // Return a context object with the snapshotted value
      //   return { previousTodos };
      // },
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
