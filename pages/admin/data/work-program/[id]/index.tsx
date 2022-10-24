import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import Button from '../../../../../components/Admin/Button';
import ImageInput from '../../../../../components/Admin/ImageInput';
import useCreateOrEditWorkProgram from '../../../../../hooks/useCreateOrEditWorkProgram';
import useDepartments from '../../../../../hooks/useDepartments';
import useFields from '../../../../../hooks/useFields';
import usePeriod from '../../../../../hooks/usePeriod';
import useWorkProgramById from '../../../../../hooks/useWorkProgramById';
import {
  Department,
  Field,
  Period,
  WorkProgram,
  WorkProgramDocumentation
} from '../../../../../types';
import TextInput from '../../../../../components/Admin/TextInput';
import TextareaInput from '../../../../../components/Admin/TextareaInput';

const schema = yup
  .object({
    name: yup.string().label('Name').required(),
    description: yup.string().label('Description'),
    participationCount: yup.string().required().label('Participation count'),
    collaborators: yup.string().label('Collaborators'),
    startDate: yup.string().required().label('Start date'),
    endDate: yup.string().required().label('End date'),
    staffs: yup.string().label('Staff'),
    departments: yup.mixed<Department[]>().label('Departments'),
    fields: yup.mixed<Field[]>().label('Fields'),
    period: yup.mixed<Period>().label('Period').required()
  })
  .required();

const defaultDate = undefined;

const defaultValues = {
  name: '',
  description: '',
  participationCount: '',
  collaborators: '',
  staffs: '',
  departments: [],
  fields: [],
  startDate: defaultDate,
  endDate: defaultDate,
  period: undefined,
  documentations: []
};

type WorkProgramPayload = Omit<WorkProgram, 'participationCount'> & {
  departments: Department[];
  fields: Field[];
  period: Period;
  documentations: Partial<WorkProgramDocumentation>[];
  participationCount: string;
};

function Admin() {
  const { query } = useRouter();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WorkProgramPayload>({
    resolver: yupResolver(schema),
    defaultValues
  });

  const {
    fields: documentationFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'documentations'
  });

  const { mutate } = useCreateOrEditWorkProgram();

  const onSubmit = (data: WorkProgramPayload) => {
    mutate(data);
  };

  const { data, isLoading } = useWorkProgramById(query.id as string);

  const { data: departments } = useDepartments();
  const { data: periods } = usePeriod();

  const { data: fields } = useFields();

  useEffect(() => {
    reset({
      id: data?.id || undefined,
      name: data?.name || '',
      description: data?.description || '',
      participationCount: data?.participationCount
        ? data?.participationCount?.toString()
        : '',
      collaborators: data?.collaborators || '',
      staffs: data?.staffs || '',
      startDate: dayjs(data?.startDate).format('YYYY-MM-DD') || defaultDate,
      endDate: dayjs(data?.endDate).format('YYYY-MM-DD') || defaultDate,
      departments:
        data?.workProgramDepartments?.map(
          wpDepartment => wpDepartment.department
        ) || [],
      fields:
        data?.workProgramFields?.map(wpDepartment => wpDepartment.field) || [],
      documentations: data?.workProgramDocumentations || [],
      period: data?.period || undefined
    });
  }, [data, reset]);

  if (isLoading) return 'Loading..';

  return (
    <div className="max-w-4xl mx-auto my-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <TextInput
          label="Participation Count"
          error={errors.participationCount?.message}
          {...register('participationCount')}
        />

        <TextareaInput
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />

        <TextInput
          label="Collaborators"
          error={errors.collaborators?.message}
          {...register('collaborators')}
        />

        <div className="mb-3">
          <div>Start Date</div>
          <input
            type="date"
            className="border rounded-xl px-2 py-1"
            {...register('startDate')}
          />
          <p className="text-red-400">{errors.startDate?.message}</p>
        </div>

        <div className="mb-3">
          <div>End Date</div>
          <input
            type="date"
            className="border rounded-xl px-2 py-1"
            {...register('endDate')}
          />
          <p className="text-red-400">{errors.endDate?.message}</p>
        </div>

        <TextareaInput
          label="Staffs"
          error={errors.staffs?.message}
          {...register('staffs')}
        />

        <div>Department</div>

        <Controller
          name="departments"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={departments?.data}
              getOptionLabel={opt => opt.name}
              getOptionValue={opt => opt.id.toString()}
              className="mb-3"
              {...field}
            />
          )}
        />

        <div className="mb-3">
          <div>Period</div>
          <Controller
            name="period"
            control={control}
            render={({ field }) => (
              <Select
                options={periods}
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.id.toString()}
                {...field}
              />
            )}
          />
          <p className="text-red-500">{errors.period?.message}</p>
        </div>

        <div>Field</div>
        <Controller
          name="fields"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={fields?.data}
              getOptionLabel={opt => opt.name}
              getOptionValue={opt => opt.id.toString()}
              className="mb-3"
              {...field}
            />
          )}
        />

        <div>Documentation</div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {documentationFields.map((documentation, i) => (
            <div key={documentation.id}>
              <Controller
                control={control}
                name={`documentations.${i}.imgUrl`}
                render={({ field: { value, onChange } }) => (
                  <ImageInput data={value} onChange={onChange} />
                )}
              />
            </div>
          ))}
        </div>
        <Button
          onClick={() => {
            append({
              imgUrl: ''
            });
          }}
          className="mb-5"
        >
          Add documentation
        </Button>

        <div>
          <Button onClick={() => handleSubmit(onSubmit)()}>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
