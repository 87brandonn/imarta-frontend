import type { NextPage } from 'next';
import Head from 'next/head';
import { ChevronLeft, ChevronRight } from 'react-feather';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

import { useState, useEffect } from 'react';
import FloatingFooter from '../components/FloatingFooter';
import Navbar from '../components/Navbar';

type AppLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const AppLayout: NextPage<AppLayoutProps> = ({
  title,
  description,
  children
}: AppLayoutProps) => {
  return (
    <>
      <Head>
        <title>Imarta - {title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-full relative">
        <Navbar />
        <div className="grow">{children}</div>
      </div>
      <FloatingFooter />
    </>
  );
};

export default AppLayout;
