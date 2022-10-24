import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../../../components/Admin/Button';
import TextInput from '../../../../../components/Admin/TextInput';
import useCreateOrEditField from '../../../../../hooks/useCreateOrEditField';
import useFieldById from '../../../../../hooks/useFieldById';
import { Department } from '../../../../../types';

const schema = yup
  .object({
    id: yup.number(),
    name: yup.string().required(),
    leader: yup.string().required()
  })
  .required();

function AdminFieldDetail() {
  const { query } = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    register
  } = useForm<Department>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      leader: ''
    }
  });

  const { mutate } = useCreateOrEditField();

  const onSubmit = (data: Department) => mutate(data);

  const { data, isLoading } = useFieldById(query.id as string);

  useEffect(() => {
    reset({
      name: data?.name || '',
      leader: data?.leader || '',
      id: data?.id || undefined
    });
  }, [data, reset]);

  if (isLoading) return 'Loading..';

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <TextInput
          label="Leader"
          error={errors.leader?.message}
          {...register('leader')}
        />

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AdminFieldDetail;
