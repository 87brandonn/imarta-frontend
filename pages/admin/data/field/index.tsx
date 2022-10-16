import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import Button from '../../../../components/Admin/Button';
import useFields from '../../../../hooks/useFields';
import AdminLayout from '../../../../layouts/Admin';

function AdminField() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useFields({
    page,
    limit
  });

  if (isLoading) return 'Loading..';

  return (
    <AdminLayout isDashboardData>
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex justify-end">
          <Link href="/admin/data/field/new">
            <Button className="mb-3">Add New Field</Button>
          </Link>
        </div>
        <table className="bg-white max-h-[85vh] overflow-y-auto rounded-xl shadow-lg overflow-x-auto block">
          <thead className="border-b">
            <th>ID</th>
            <th>Name</th>
            <th>Leader</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data?.data.map((workProgram, i) => (
              <tr key={workProgram.id}>
                <td>{workProgram.id}</td>
                <td>{workProgram.name}</td>
                <td>{workProgram.leader}</td>
                <td>
                  <Link href={`/admin/data/field/${workProgram.id}`}>
                    <Edit />
                  </Link>
                  <Trash className="text-red-400" />
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

export default AdminField;
