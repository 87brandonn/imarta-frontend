import cx from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Menu } from 'react-feather';
import FloatingFooter from '../components/FloatingFooter';
import Navbar, { navbarData } from '../components/Navbar';

type AppLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function useOutsideAlerter(ref: RefObject<HTMLElement>, cb: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cb, ref]);
}

const AppLayout: NextPage<AppLayoutProps> = ({
  title,
  description,
  children
}: AppLayoutProps) => {
  const [isActive, setIsActive] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(sidebarRef, () => {
    setIsActive(false);
  });

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isActive]);
  return (
    <>
      <Head>
        <title>Imarta - {title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col relative">
        <div
          className={cx(
            'transform -translate-x-full transition-transform lg:hidden absolute left-0 top-0 w-36 h-full z-20 bg-white px-2 py-1',
            isActive && 'translate-x-0'
          )}
          ref={sidebarRef}
        >
          <Menu onClick={() => setIsActive(false)} className="mb-6" />
          {navbarData.map((nav, i) => (
            <div className="mb-4" key={i}>
              {nav.href ? <Link href={nav.href}>{nav.title}</Link> : nav.title}
            </div>
          ))}
        </div>
        <Navbar onExpand={setIsActive} />
        <div className="grow">{children}</div>
      </div>
      <FloatingFooter />
    </>
  );
};

export default AppLayout;
