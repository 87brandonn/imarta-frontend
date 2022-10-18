import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function Admin() {
  return (
    <>
      <Head>
        <title>Imarta - Admin</title>
      </Head>
      <div className="max-w-3xl mx-auto my-12">
        <div className="text-3xl mb-12">Welcome to IMARTA Admin Dashboard</div>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/admin/cms">
            <div className="bg-white shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer px-3 py-2 rounded-xl">
              <div className="text-xl mb-2">CMS</div>
              <div className="font-light">
                Manage your website content using Content Management System
                (CMS)
              </div>
            </div>
          </Link>
          <Link href="/admin/data">
            <div className="bg-white shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer px-3 py-2 rounded-xl">
              <div className="text-xl mb-2">Data</div>
              <div className="font-light">
                Manage data including organization meta, department, fields,
                work program, etc
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Admin;
