import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../../../components/Admin/Button';
import TextInput from '../../../../../components/Admin/TextInput';
import useCreateOrEditPeriod from '../../../../../hooks/useCreateOrEditPeriod';
import usePeriodById from '../../../../../hooks/usePeriodById';
import { Period } from '../../../../../types';

const schema = yup
  .object({
    id: yup.number(),
    label: yup.string().required().label('Period name')
  })
  .required();

function AdminPeriodDetail() {
  const { query } = useRouter();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register
  } = useForm<Period>({
    resolver: yupResolver(schema),
    defaultValues: {
      label: ''
    }
  });

  const { mutate } = useCreateOrEditPeriod();

  const onSubmit = (data: Period) => mutate(data);

  const { data, isLoading, error } = usePeriodById(
    parseInt(query.id as string, 10)
  );

  useEffect(() => {
    reset({
      label: data?.label || ''
    });
  }, [data, reset]);

  if (isLoading) return 'Loading..';

  if (error) return 'Something went wrong. Please refresh the page';

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          error={errors.label?.message}
          placeholder="Enter period name"
          {...register('label')}
        />

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AdminPeriodDetail;
