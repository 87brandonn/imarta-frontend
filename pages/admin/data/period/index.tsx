import Link from 'next/link';
import { confirmAlert } from 'react-confirm-alert';
import { Trash } from 'react-feather';
import Button from '../../../../components/Admin/Button';
import useDeletePeriod from '../../../../hooks/useDeletePeriod';
import usePeriod from '../../../../hooks/usePeriod';
import AdminLayout from '../../../../layouts/Admin';

function Admin() {
  const { data, isLoading } = usePeriod();

  const { mutate: deletePeriod } = useDeletePeriod();

  const handleDelete = (id: number) =>
    confirmAlert({
      title: 'Confirm deletion',
      message:
        'Are you sure want to delete this period? All data associated with this period will be deleted. This action cannot be undone',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletePeriod(id)
        },
        {
          label: 'No'
        }
      ]
    });

  return (
    <AdminLayout isDashboardData>
      <div className="max-w-4xl mx-auto my-12">
        <div className="flex justify-end">
          <Link href="/admin/data/period/new">
            <Button className="mb-3">Add New Period</Button>
          </Link>
        </div>

        <table className="bg-white max-h-[85vh] overflow-y-auto rounded-xl shadow-lg overflow-x-auto block">
          <thead className="border-b">
            <tr>
              <th>ID</th>
              <th>Period</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? 'Loading'
              : data?.map((period, i) => (
                  <tr key={period.id}>
                    <td>{period.id}</td>
                    <td>{period.label}</td>
                    <td className="flex">
                      <Trash
                        className="text-red-400"
                        onClick={() => handleDelete(period.id)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Admin;
