import type { NextPage } from 'next';
import Image from 'next/future/image';
import AnimatedHero from '../../components/AnimatedHero';
import OrganizationStructurePeriodDescription from '../../components/OrganizationStructure/PeriodDescription';
import AppLayout from '../../layouts';

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

const OrganizationStructure: NextPage = () => {
  return (
    <AppLayout title="Organization Structure">
      <AnimatedHero>
        <Image
          sizes="100vw"
          height="0"
          width="0"
          className="w-full h-auto"
          src="/org-structure-banner.jpg"
          alt="org-banner"
          priority
        />
      </AnimatedHero>

      <OrganizationStructurePeriodDescription
        period="2021/2022"
        vision="Menjadikan IMARTA yang inklusif, integratif dan apresiatif"
        missions={missions}
        imgHierarchyUrl="/org-structure-2122.jpg"
      />
      <OrganizationStructurePeriodDescription
        period="2020/2021"
        vision="Menjadikan IMARTA yang inklusif, integratif dan apresiatif"
        missions={missions}
        imgHierarchyUrl="/org-structure-2122.jpg"
        isDarkenBackground
      />
      <OrganizationStructurePeriodDescription
        period="2019/2020"
        vision="Menjadikan IMARTA yang inklusif, integratif dan apresiatif"
        missions={missions}
        imgHierarchyUrl="/org-structure-2122.jpg"
        isDarkenBackground
      />
    </AppLayout>
  );
};

export default OrganizationStructure;
