import Head from 'next/head';
import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import getAuthenticatedUser from '../../utils/getAuthenticatedUser';
import AdminSidebar from './Sidebar';
import Router from 'next/router';

type AdminLayoutProp = {
  isDashboardData?: boolean;
  children: React.ReactNode;
  withoutSidebar?: boolean;
};

function AdminLayout({
  children,
  isDashboardData,
  withoutSidebar
}: AdminLayoutProp) {
  useEffect(() => {
    if (!getAuthenticatedUser(getCookie('user') as string)) {
      Router.push(`/admin/oauth`);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Imarta - Admin</title>
        <meta name="description" content="Admin page for IMARTA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full flex">
        {!withoutSidebar && (
          <div className="flex-none h-full w-36">
            <AdminSidebar isDashboardData={isDashboardData} />
          </div>
        )}
        <div className="grow overflow-auto">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
