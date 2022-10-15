import Link from 'next/link';
import { useRouter } from 'next/router';
import { Edit } from 'react-feather';
import useWorkProgram from '../../../../hooks/useWorkProgram';

function Admin() {
  const { data, isLoading } = useWorkProgram();
  const router = useRouter();

  if (isLoading) return 'Loading..';

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <table className="bg-white max-h-[85vh] overflow-y-auto rounded-xl shadow-lg overflow-x-auto block">
        <thead className="border-b">
          <th>No</th>
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
          {data?.map((workProgram, i) => (
            <tr key={workProgram.id}>
              <td>{i + 1}</td>
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
              <td>{workProgram.startDate?.toISOString()}</td>
              <td>{workProgram.endDate?.toISOString()}</td>
              <td>
                <Link href={`/admin/data/work-program/${workProgram.id}`}>
                  <Edit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
