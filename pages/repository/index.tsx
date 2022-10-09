import type { NextPage } from 'next';
import Head from 'next/head';
import FloatingFooter from '../../components/FloatingFooter';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import { Menu } from 'react-feather';
import PeriodDepartmentProker from '../../components/Repository/PeriodDepartmentProker';

const repositoryData20212022 = [
  { department: 'Departemen Pelayanan & Galeri Lawang' },
  { department: 'Departemen Riset & Pengembangan' },
  { department: 'Departemen Hubungan Mahasiswa' },
  { department: 'Program Kerja Kolektif & Fungsional' }
];

const Repository: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imarta - Repository</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="relative">
        <img src="/repository-banner.jpg" />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <Menu size={36} />
          <input
            type="text"
            className="border-2 bg-transparent focus:outline-none border-black rounded-2xl w-[300px] px-4 py-1"
            placeholder="Search on Galeri IMARTA..."
          />
        </div>
      </div>
      <div className="my-5 ml-1 lg:ml-4">
        <PeriodDepartmentProker
          period="2021/2022"
          data={repositoryData20212022}
        />
        <PeriodDepartmentProker
          period="2022/2023"
          data={repositoryData20212022}
        />
        <PeriodDepartmentProker
          period="2023/2024"
          data={repositoryData20212022}
        />
      </div>
      <FloatingFooter />
    </>
  );
};

export default Repository;
