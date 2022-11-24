import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  WorkProgramDocumentation,
  WorkProgramStaff
} from '../../../../../types';
import TextInput from '../../../../../components/Admin/TextInput';
import TextareaInput from '../../../../../components/Admin/TextareaInput';
import useLoadFields from '../../../../../hooks/options/useLoadFields';
import { AsyncPaginate } from 'react-select-async-paginate';

const schema = yup
  .object({
    name: yup.string().label('Name').required(),
    description: yup.string().label('Description'),
    participationCount: yup.string().required().label('Participation count'),
    collaborators: yup.string().label('Collaborators'),
    startDate: yup.string().required().label('Start date'),
    endDate: yup.string().required().label('End date'),
    staffs: yup.mixed<WorkProgramStaff[]>().label('Staff'),
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
  staffs: [],
  departments: [],
  fields: [],
  startDate: defaultDate,
  endDate: defaultDate,
  period: undefined,
  documentations: []
};

export type WorkProgramPayload = Omit<WorkProgram, 'participationCount'> & {
  departments: Department[];
  staffs: Partial<WorkProgramStaff>[];
  fields: Field[];
  period: Period;
  documentations: Partial<WorkProgramDocumentation>[];
  participationCount: string;
};

function Admin() {
  const { query } = useRouter();

  const [limit, setLimit] = useState(10);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
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

  const {
    fields: staffFields,
    append: appendStaffs,
    remove: removeStaffs
  } = useFieldArray({
    control,
    name: 'staffs'
  });

  const { mutate, isLoading: isLoadingCreateOrUpdate } =
    useCreateOrEditWorkProgram();

  const onSubmit = (data: WorkProgramPayload) => {
    mutate(data);
  };

  const { data, isLoading, error } = useWorkProgramById(query.id as string);

  const { data: departments } = useDepartments();
  const { data: periods } = usePeriod();

  const loadFields = useLoadFields(limit);

  useEffect(() => {
    reset({
      id: data?.id || undefined,
      name: data?.name || '',
      description: data?.description || '',
      participationCount: data?.participationCount || '',
      collaborators: data?.collaborators || '',
      staffs: data?.workProgramStaffs || [],
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

  if (error) return 'Something went wrong. Please refresh the page';

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

        <div className="mb-3">
          <div>Staff</div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {watch('staffs').map((staff, i) => (
              <div key={staff.id}>
                <div className="flex gap-2">
                  <Controller
                    control={control}
                    name={`staffs.${i}.name`}
                    render={({ field }) => (
                      <>
                        <TextInput {...field} />
                      </>
                    )}
                  />
                  <Controller
                    control={control}
                    name={`staffs.${i}.isLead`}
                    render={({ field }) => (
                      <div>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        <div className="text-sm text-gray-400">Lead</div>
                      </div>
                    )}
                  />
                </div>
                <Button
                  onClick={() => {
                    removeStaffs(i);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={() => {
              appendStaffs({
                name: '',
                isLead: false
              });
            }}
            className="mb-3"
          >
            Add staffs
          </Button>
        </div>

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
            <AsyncPaginate
              loadOptions={loadFields}
              additional={{
                page: 0
              }}
              className="w-48"
              isMulti
              menuPortalTarget={
                typeof document !== 'undefined' ? document.body : undefined
              }
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              getOptionLabel={opt => opt.name}
              getOptionValue={opt => opt.id.toString()}
              loadingMessage={({ inputValue }) => `Searching ${inputValue}...`}
              {...field}
            />
          )}
        />
        <div>Documentation</div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {watch('documentations').map((documentation, i) => (
            <div key={documentation.id}>
              <Controller
                control={control}
                name={`documentations.${i}.imgUrl`}
                render={({ field: { value, onChange } }) => (
                  <>
                    <ImageInput
                      data={{
                        imgUrl: value,
                        type:
                          documentation.fileType === 'IMAGE'
                            ? 'image'
                            : documentation.fileType === 'VIDEO'
                            ? 'video'
                            : 'embed'
                      }}
                      onChange={img => {
                        setValue(
                          `documentations.${i}.fileType`,
                          img?.type === 'embed'
                            ? 'YOUTUBE'
                            : img?.type === 'video'
                            ? 'VIDEO'
                            : 'IMAGE'
                        );
                        onChange(img?.imgUrl || '');
                      }}
                      withoutLink
                    />
                    <Button className="mt-3" onClick={() => remove(i)}>
                      Remove
                    </Button>
                  </>
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
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            disabled={isLoadingCreateOrUpdate}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
