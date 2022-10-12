import type { NextPage } from 'next';
import Head from 'next/head';
import FloatingFooter from '../../components/FloatingFooter';
import Navbar from '../../components/Navbar';
import OrganizationStructurePeriodDescription from '../../components/OrganizationStructure/PeriodDescription';

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
    <>
      <Head>
        <title>Imarta - Organization Structure</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <img src="/org-structure-banner.jpg" alt="org-banner" />
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
      <FloatingFooter />
    </>
  );
};

export default OrganizationStructure;