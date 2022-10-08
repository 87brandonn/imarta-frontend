import type { NextPage } from 'next';
import Head from 'next/head';
import FloatingFooter from '../../components/FloatingFooter';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import { Menu } from 'react-feather';

const Repository: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imarta - Repository</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex gap-3 items-center m-3">
        <Menu size={36} />
        <input
          type="text"
          className="border-2 border-black rounded-2xl w-[300px] px-4 py-1"
          placeholder="Search on Galeri IMARTA..."
        />
      </div>
      <FloatingFooter />
    </>
  );
};

export default Repository;
