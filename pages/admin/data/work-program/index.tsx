import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import Button from '../../../../components/Admin/Button';
import TextInput from '../../../../components/Admin/TextInput';
import useLoadDepartments from '../../../../hooks/options/useLoadDepartments';
import useLoadFields from '../../../../hooks/options/useLoadFields';
import useDeleteWorkProgram from '../../../../hooks/useDeleteWorkProgram';
import useWorkProgram, {
  WorkProgramFilter
} from '../../../../hooks/useWorkProgram';
import AdminLayout from '../../../../layouts/Admin';
import { Department, Field, Period, WorkProgram } from '../../../../types';

const schema = yup
  .object({
    name: yup.string().label('Name'),
    description: yup.string().label('Description'),
    participationCount: yup.string().label('Participation count'),
    collaborators: yup.string().label('Collaborators'),
    startDate: yup.string().label('Start date'),
    endDate: yup.string().label('End date'),
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

type WorkProgramForm = Omit<WorkProgram, 'participationCount'> & {
  departments: Department[];
  fields: Field[];
  participationCount: string;
};

function Admin() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<WorkProgramForm>({
    resolver: yupResolver(schema),
    defaultValues
  });

  const [filterFields, setFilterFields] = useState<WorkProgramFilter>();

  const { data, isLoading } = useWorkProgram({
    page,
    limit,
    ...filterFields
  });

  const loadDepartments = useLoadDepartments(limit);
  const loadFields = useLoadFields(limit);

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

  const onSearch = (data: WorkProgramForm) => {
    setFilterFields({
      name: data.name?.length ? data.name : undefined,
      description: data.description?.length ? data.description : undefined,
      participationCount: data.participationCount
        ? parseInt(data.participationCount, 10)
        : undefined,
      collaborators: data.collaborators?.length
        ? data.collaborators
        : undefined,
      staffs: data.staffs?.length ? data.staffs : undefined,
      departments: data.departments?.map(dep => dep.id),
      fields: data.fields.map(field => field.id),
      startDate: data.startDate,
      endDate: data.endDate
    });
  };

  if (isLoading) return 'Loading..';

  return (
    <AdminLayout isDashboardData>
      <div className="max-w-4xl mx-auto my-12">
        <div className="flex justify-end">
          <Link href="/admin/data/work-program/new">
            <Button className="mb-3">Add New Work Program</Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 my-4">
          <TextInput
            placeholder="Search by name"
            label="Name"
            {...register('name')}
          />
          <TextInput
            placeholder="Search by description"
            label="Description"
            {...register('description')}
          />
          <TextInput
            placeholder="Search by participation count"
            label="Participation Count"
            {...register('participationCount')}
          />
          <TextInput
            placeholder="Search by collaborators"
            label="Collaborators"
            {...register('collaborators')}
          />

          <TextInput
            placeholder="Search by staffs"
            label="Staff"
            {...register('staffs')}
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

        <Button onClick={() => handleSubmit(onSearch)()}>Search</Button>

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
                    ?.map(data => data.department.name)
                    .join(',')}
                </td>
                <td>
                  {workProgram.workProgramFields
                    ?.map(data => data.field.name)
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
