import Link from 'next/link';
import { useRouter } from 'next/router';
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
  },
  {
    name: 'Arthur',
    key: 'arthur',
    path: '/arthur'
  },
  {
    name: 'Floating Footer',
    key: 'floating-footer',
    path: '/floating-footer'
  }
];

const dataPages = [
  {
    name: 'Work Program',
    key: 'work-program',
    path: '/work-program'
  },
  {
    name: 'Department',
    key: 'department',
    path: '/department'
  },
  {
    name: 'Field',
    key: 'field',
    path: '/field'
  },
  {
    name: 'Meta',
    key: 'meta',
    path: '/meta'
  },
  {
    name: 'Period',
    key: 'period',
    path: '/period'
  }
];

type AdminSidebarProps = {
  isDashboardData?: boolean;
};

function AdminSidebar({ isDashboardData }: AdminSidebarProps) {
  const { query } = useRouter();

  const renderedData = useMemo(
    () => (isDashboardData ? dataPages : pages),
    [isDashboardData]
  );

  return (
    <div className="h-full bg-gray-100 flex flex-col gap-3 p-3">
      <Link href="/admin">
        <div className="text-2xl font-bold cursor-pointer">Admin</div>
      </Link>
      {renderedData.map((page, i) => (
        <Link
          href={`/admin${isDashboardData ? '/data' : '/cms'}${page.path}`}
          key={i}
        >
          <div
            className={`cursor-pointer border-b ${
              query.id === page.key ? 'border-black' : 'border-transparent'
            }`}
          >
            {page.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AdminSidebar;
