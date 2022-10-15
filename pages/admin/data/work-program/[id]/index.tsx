import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import useWorkProgramById, {
  WorkProgramJoined
} from '../../../../../hooks/useWorkProgramById';
import { useEffect } from 'react';
import useDepartments from '../../../../../hooks/useDepartmentt';
import useFields from '../../../../../hooks/useFields';
import { Department, Field, Period, WorkProgram } from '../../../../../types';
import usePeriod from '../../../../../hooks/usePeriod';
import TextInput from '../../../../../components/TextInput';

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required()
  })
  .required();

function Admin() {
  const { query } = useRouter();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<
    WorkProgram & {
      departments: Department[];
      fields: Field[];
      period: Period;
    }
  >({
    resolver: yupResolver(schema)
  });

  const onSubmit = (
    data: WorkProgram & {
      departments: Department[];
      fields: Field[];
      period: Period;
    }
  ) => console.log(data);

  const { data, isLoading } = useWorkProgramById(query.id as string);

  const { data: departments } = useDepartments();
  const { data: periods } = usePeriod();

  const { data: fields } = useFields();

  useEffect(() => {
    reset({
      ...data,
      departments: data?.workProgramDepartments.map(
        wpDepartment => wpDepartment.department
      ),
      fields: data?.workProgramFields.map(wpDepartment => wpDepartment.field)
    });
  }, [data, reset]);

  if (isLoading) return 'Loading..';

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          isHookForm
          control={control}
          controlName="name"
          label="Name"
          error={errors.name?.message}
        />

        <TextInput
          isHookForm
          control={control}
          controlName="participationCount"
          label="Participation Count"
          error={errors.participationCount?.message}
        />

        <TextInput
          isHookForm
          control={control}
          controlName="description"
          label="Description"
          error={errors.description?.message}
        />

        <TextInput
          isHookForm
          control={control}
          controlName="collaborators"
          label="Collaborators"
          error={errors.collaborators?.message}
        />

        <div>Department</div>

        <Controller
          name="departments"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={departments}
              getOptionLabel={opt => opt.name}
              getOptionValue={opt => opt.id.toString()}
              className="mb-3"
              {...field}
            />
          )}
        />

        <div>Period</div>
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <Select
              options={periods}
              getOptionLabel={opt => opt.label}
              getOptionValue={opt => opt.id.toString()}
              className="mb-3"
              {...field}
            />
          )}
        />

        <div>Field</div>
        <Controller
          name="fields"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={fields}
              getOptionLabel={opt => opt.name}
              getOptionValue={opt => opt.id.toString()}
              className="mb-3"
              {...field}
            />
          )}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default Admin;
