import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Controller, Field, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { confirmAlert } from 'react-confirm-alert';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { AsyncPaginate } from 'react-select-async-paginate';
import Button from '../../../../components/Admin/Button';
import TextInput from '../../../../components/TextInput';
import useDeleteWorkProgram from '../../../../hooks/useDeleteWorkProgram';
import useWorkProgram, {
  WorkProgramFilterField
} from '../../../../hooks/useWorkProgram';
import AdminLayout from '../../../../layouts/Admin';
import getDepartments from '../../../../services/api/getDepartments';
import getFields from '../../../../services/api/getFields';
import { Department, Period } from '../../../../types';
import { WorkProgramPayload } from './[id]';

const schema = yup
  .object({
    name: yup.string().label('Name').required(),
    description: yup.string().label('Description'),
    participationCount: yup.number().required().label('Participation count'),
    collaborators: yup.string().label('Collaborators'),
    startDate: yup.string().required().label('Start date'),
    endDate: yup.string().required().label('End date'),
    staffs: yup.string().label('Staff'),
    departments: yup.mixed<Department[]>().label('Departments'),
    fields: yup.mixed<Field[]>().label('Fields'),
    period: yup.mixed<Period>().label('Period')
  })
  .required();

const defaultValues = {
  name: '',
  description: '',
  participationCount: '',
  collaborators: '',
  staffs: '',
  departments: [],
  fields: [],
  startDate: undefined,
  endDate: undefined,
  period: undefined,
  documentations: []
};

function Admin() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const {
    control,
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm<WorkProgramPayload>({
    resolver: yupResolver(schema),
    defaultValues
  });

  const [filterFields, setFilterFields] = useState<WorkProgramFilterField>();

  const { data, isLoading } = useWorkProgram({
    page,
    limit,
    ...filterFields
  });

  const loadDepartments = useCallback(
    async (search: string, _: any, { page: additionalPage }: any) => {
      const data = await getDepartments({
        search: search || undefined,
        page: additionalPage,
        limit
      });

      return {
        options: data.data,
        hasMore: data.meta.page + 1 < data.meta.totalPage,
        additional: {
          page: data.meta.page + 1
        }
      };
    },
    [limit]
  );

  const loadFields = useCallback(
    async (search: string, _: any, { page: additionalPage }: any) => {
      const data = await getFields({
        search: search || undefined,
        page: additionalPage,
        limit
      });

      return {
        options: data.data,
        hasMore: data.meta.page + 1 < data.meta.totalPage,
        additional: {
          page: data.meta.page + 1
        }
      };
    },
    [limit]
  );

  const { mutate: deleteWorkProgram } = useDeleteWorkProgram();

  const handleDelete = (id: number) =>
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure want to delete? This action cannot be undone',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteWorkProgram(id)
        },
        {
          label: 'No'
        }
      ]
    });

  if (isLoading) return 'Loading..';

  return (
    <AdminLayout isDashboardData>
      <div className="max-w-4xl mx-auto my-12">
        <div className="flex justify-end">
          <Link href="/admin/data/work-program/new">
            <Button className="mb-3">Add New Work Program</Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 my-4">
          <TextInput
            isHookForm
            control={control}
            controlName="name"
            placeholder="Search by name"
            label="Name"
          />
          <TextInput
            isHookForm
            control={control}
            controlName="description"
            placeholder="Search by description"
            label="Description"
          />
          <TextInput
            isHookForm
            control={control}
            controlName="participationCount"
            placeholder="Search by participation count"
            label="Participation Count"
          />
          <TextInput
            isHookForm
            control={control}
            controlName="collaborators"
            placeholder="Search by collaborators"
            label="Collaborators"
          />

          <TextInput
            isHookForm
            control={control}
            controlName="staffs"
            placeholder="Search by staffs"
            label="Staff"
          />

          <div>
            <div>Department</div>
            <Controller
              name="departments"
              control={control}
              render={({ field }) => (
                <AsyncPaginate
                  loadOptions={loadDepartments}
                  additional={{
                    page: 0
                  }}
                  className="w-48"
                  isMulti
                  getOptionLabel={opt => opt.name}
                  getOptionValue={opt => opt.id.toString()}
                  loadingMessage={({ inputValue }) =>
                    `Searching ${inputValue}...`
                  }
                  {...field}
                />
              )}
            />
          </div>

          <div>
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
                  getOptionLabel={opt => opt.name}
                  getOptionValue={opt => opt.id.toString()}
                  loadingMessage={({ inputValue }) =>
                    `Searching ${inputValue}...`
                  }
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <div>Start Date</div>
            <input
              type="date"
              className="border rounded-xl px-2 py-1"
              {...register('startDate')}
            />
          </div>

          <div>
            <div>End Date</div>
            <input
              type="date"
              className="border rounded-xl px-2 py-1"
              {...register('endDate')}
            />
          </div>
        </div>

        <Button
          onClick={() =>
            setFilterFields({
              name: watch('name')?.length ? watch('name') : undefined,
              description: watch('description')?.length
                ? watch('description')
                : undefined,
              participationCount: watch('participationCount'),
              collaborators: watch('collaborators')?.length
                ? watch('collaborators')
                : undefined,
              staffs: watch('staffs')?.length ? watch('staffs') : undefined,
              departments: watch('departments')
                .map(dep => dep.id)
                .join(','),
              fields: watch('fields')
                .map(field => field.id)
                .join(','),
              startDate: watch('startDate'),
              endDate: watch('endDate')
            })
          }
        >
          Search
        </Button>

        <Button
          className="ml-3"
          onClick={() => {
            reset(defaultValues);
            setFilterFields(undefined);
          }}
        >
          Clear
        </Button>

        <table className="bg-white max-h-[85vh] overflow-y-auto rounded-xl shadow-lg overflow-x-auto block">
          <thead className="border-b">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Period</th>
            <th>Participation Count</th>
            <th>Kolaborator</th>
            <th>Staff</th>
            <th>Department</th>
            <th>Field</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
          </thead>
          <tbody>
            {data?.data.map((workProgram, i) => (
              <tr key={workProgram.id}>
                <td>{workProgram.id}</td>
                <td>{workProgram.name}</td>
                <td>{workProgram.description}</td>
                <td>{workProgram.period?.label}</td>
                <td>{workProgram.participationCount}</td>
                <td>{workProgram.collaborators}</td>
                <td>{workProgram.staffs}</td>
                <td>
                  {workProgram.workProgramDepartments
                    .map(data => data.department.name)
                    .join(',')}
                </td>
                <td>
                  {workProgram.workProgramFields
                    .map(data => data.field.name)
                    .join(',')}
                </td>
                <td>{workProgram.startDate}</td>
                <td>{workProgram.endDate}</td>
                <td className="flex">
                  <Link href={`/admin/data/work-program/${workProgram.id}`}>
                    <Edit />
                  </Link>
                  <Trash
                    className="text-red-400"
                    onClick={() => handleDelete(workProgram.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          previousLabel={<ChevronLeft />}
          containerClassName="flex gap-3 items-center mt-3"
          pageClassName="bg-violet-200 w-8 transition-transform transform-scale-100 h-8 text-white rounded-full flex items-center justify-center"
          activeClassName="transform font-bold scale-125"
          onPageChange={({ selected }) => setPage(selected)}
          pageRangeDisplayed={5}
          forcePage={page}
          pageCount={data?.meta.totalPage || 0}
          nextLabel={<ChevronRight />}
        />
      </div>
    </AdminLayout>
  );
}

export default Admin;
