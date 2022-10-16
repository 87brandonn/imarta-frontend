import Link from 'next/link';
import React, { useMemo } from 'react';

const pages = [
  {
    name: 'Home',
    key: 'home',
    path: '/home'
  },
  {
    name: 'Repository',
    key: 'repository',
    path: '/repository'
  },
  {
    name: 'Galeri Lawang',
    key: 'galeri-lawang',
    path: '/galeri-lawang'
  },
  {
    name: 'Bursa',
    key: 'bursa-imarta',
    path: '/bursa-imarta'
  },
  {
    name: 'About',
    key: 'about',
    path: '/about'
  },
  {
    name: 'Organization Structure',
    key: 'organization-structure',
    path: '/organization-structure'
  }
];

const dataPages = [
  {
    name: 'Work Program',
    key: 'work-program',
    path: '/data/work-program'
  },
  {
    name: 'Department',
    key: 'department',
    path: '/data/department'
  },
  {
    name: 'Field',
    key: 'field',
    path: '/data/field'
  },
  {
    name: 'Meta',
    key: 'meta',
    path: '/data/meta'
  }
];

type AdminSidebarProps = {
  isDashboardData?: boolean;
};

function AdminSidebar({ isDashboardData }: AdminSidebarProps) {
  const renderedData = useMemo(
    () => (isDashboardData ? dataPages : pages),
    [isDashboardData]
  );

  return (
    <div className="h-full bg-gray-100 flex flex-col gap-3 p-3">
      {renderedData.map((page, i) => (
        <Link href={`/admin${page.path}`} key={i}>
          <div className="cursor-pointer">{page.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default AdminSidebar;
