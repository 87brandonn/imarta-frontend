import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { OrganizationStructureFromApi } from '../../components/Admin/OrganizationStructureInput';
import AnimatedHero from '../../components/AnimatedHero';
import OrganizationStructurePeriodDescription from '../../components/OrganizationStructure/PeriodDescription';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

const missions = [
  `Mempertahankan dan membangun kembali hubungan yang baik antar
mahasiswa, pengurus, dosen, staff, organisasi lebih baik internal
maupun eksternal`,
  `Mewujudkan program kerja yang kolaboratif dan inovatif, baik
secara akademik maupun non-akademik`,
  `Memaksimalkan quality control dan aspirasi mahasiswa untuk
mengembangkan program kerja yang lebih terbuka, dinamis, dan tepat
guna terhadap minat dan bakat mahasiswa`
];

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('organization-structure');
  return {
    props: { data }
  };
};

function OrganizationStructure({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memoizedHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-1')
        ?.attributes.find(attr => attr.name === 'hero'),
    [data.sections]
  );

  const memoizedOrgStructureData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-2')
        ?.attributes.find(attr => attr.name === 'org-structure')
        ?.data as OrganizationStructureFromApi[],
    [data.sections]
  );

  return (
    <AppLayout title="Organization Structure">
      <AnimatedHero>
        <Image
          sizes="100vw"
          height="0"
          width="0"
          className="w-full h-auto"
          src={memoizedHeroData?.data}
          alt="org-banner"
          priority
        />
      </AnimatedHero>

      {memoizedOrgStructureData.map((orgStructure, i) => (
        <OrganizationStructurePeriodDescription
          key={i}
          data={orgStructure}
          index={i}
        />
      ))}
    </AppLayout>
  );
}

export default OrganizationStructure;
