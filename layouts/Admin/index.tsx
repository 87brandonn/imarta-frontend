import Head from 'next/head';
import React from 'react';
import AdminSidebar from './Sidebar';

type AdminLayoutProp = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AdminLayoutProp) {
  return (
    <>
      <Head>
        <title>Imarta - Admin</title>
        <meta name="description" content="Admin page for IMARTA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full flex">
        <div className="flex-none h-full w-36">
          <AdminSidebar />
        </div>
        <div className="grow overflow-auto">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
