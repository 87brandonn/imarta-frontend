import Link from 'next/link';
import { Edit, Trash } from 'react-feather';
import Button from '../../../../components/Admin/Button';
import useMetas from '../../../../hooks/useMetas';
import AdminLayout from '../../../../layouts/Admin';

function AdminMeta() {
  const { data, isLoading } = useMetas();

  if (isLoading) return 'Loading..';

  return (
    <AdminLayout isDashboardData>
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex justify-end">
          <Link href="/admin/data/meta/new">
            <Button className="mb-3">Add New Meta</Button>
          </Link>
        </div>
        <table className="bg-white max-h-[85vh] overflow-y-auto rounded-xl shadow-lg overflow-x-auto block">
          <thead className="border-b">
            <th>ID</th>
            <th>Vision</th>
            <th>Mission</th>
            <th>Period</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data?.map((meta, i) => (
              <tr key={meta.id}>
                <td>{meta.id}</td>
                <td>{meta.vision}</td>
                <td>
                  {meta.organizationMetaMissions
                    .map(mission => mission.value)
                    .join(',')}
                </td>
                <td>{meta.period.label}</td>
                <td>
                  <Link href={`/admin/data/meta/${meta.id}`}>
                    <Edit />
                  </Link>
                  <Trash className="text-red-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminMeta;
