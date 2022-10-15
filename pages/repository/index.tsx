import type { NextPage } from 'next';
import Image from 'next/future/image';
import { Menu } from 'react-feather';
import AnimatedHero from '../../components/AnimatedHero';
import PeriodDepartmentProker from '../../components/Repository/PeriodDepartmentProker';
import AppLayout from '../../layouts';
import { toBase64, shimmer } from '../../utils';

const repositoryData20212022 = [
  { department: 'Departemen Pelayanan & Galeri Lawang' },
  { department: 'Departemen Riset & Pengembangan' },
  { department: 'Departemen Hubungan Mahasiswa' },
  { department: 'Program Kerja Kolektif & Fungsional' }
];

const Repository: NextPage = () => {
  return (
    <AppLayout title="Repository">
      <div className="relative">
        <AnimatedHero>
          <Image
            alt="repository-banner"
            src="/repository-banner.jpg"
            priority
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </AnimatedHero>
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <Menu size={36} />
          <input
            type="text"
            className="border-2 bg-transparent focus:outline-none border-black rounded-2xl w-[300px] px-4 py-1"
            placeholder="Search on Galeri IMARTA..."
          />
        </div>
      </div>
      <div className="my-10 ml-1 lg:ml-4">
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
    </AppLayout>
  );
};

export default Repository;
