import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '../../layouts/Admin';

export interface GoogleAuth {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

function Admin() {
  return (
    <AdminLayout withoutSidebar>
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
    </AdminLayout>
  );
}

export default Admin;
