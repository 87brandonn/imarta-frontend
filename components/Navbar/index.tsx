import React from 'react';
import { Menu } from 'react-feather';
import Link from 'next/link';
import Image from 'next/future/image';

type NavbarProps = {
  onExpand: (val: boolean) => void;
};

export const navbarData = [
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Repository',
    href: '/repository'
  },
  {
    title: (
      <div className="flex gap-4 cursor-pointer bg-black lg:bg-transparent rounded">
        <div className="flex-1">
          <Image
            src="/logo-imarta-transparent.png"
            alt="logo-navbar"
            sizes="100vw"
            width={0}
            height={0}
            className="w-full h-10 lg:h-12 object-contain"
            priority
          />
        </div>

        <div className="flex-1">
          <Image
            sizes="100vw"
            width={0}
            height={0}
            src="/sketsa-white.png"
            className="w-full h-10 lg:h-12 object-contain"
            alt="logo-navbar"
            priority
          />
        </div>
      </div>
    ),
    href: '/'
  },
  {
    title: 'Galeri Lawang',
    href: '/galeri-lawang'
  },
  {
    title: 'Bursa',
    href: '/bursa-imarta'
  }
];

function Navbar({ onExpand }: NavbarProps) {
  return (
    <>
      <div className="bg-[#282828] py-3 px-2">
        <div className="hidden max-w-4xl mx-auto lg:flex justify-between items-center">
          {navbarData.map((nav, i) => (
            <Link href={nav.href} key={i}>
              {typeof nav.title === 'string' ? (
                <div className="text-white font-light cursor-pointer">
                  {nav.title}
                </div>
              ) : (
                nav.title
              )}
            </Link>
          ))}
        </div>
        <Menu onClick={() => onExpand(true)} className="text-white lg:hidden" />
      </div>
    </>
  );
}

export default Navbar;
