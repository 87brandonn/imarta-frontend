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
    subMenu: [
      {
        title: 'Sejarah',
        isExternal: false,
        url: '/about'
      },
      {
        title: 'Struktur Organisasi',
        isExternal: false,
        url: '/organization-structure'
      }
    ]
  },
  {
    title: 'Repository',
    subMenu: [
      {
        title: 'Galeri IMARTA',
        isExternal: false,
        url: '/repository'
      },
      {
        title: 'Riset IMARTA',
        isExternal: true,
        url: 'https://google.com'
      },
      {
        title: 'ARTHUR',
        isExternal: false,
        url: '/arthur'
      },
      {
        title: 'Majalah SKETSA',
        isExternal: true,
        url: 'https://google.com'
      },
      {
        title: 'ADW',
        isExternal: true,
        url: 'https://google.com'
      }
    ]
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
            <div className="flex-1 justify-center flex group relative" key={i}>
              {nav.href ? (
                <Link href={nav.href}>
                  <div className="cursor-pointer">
                    {typeof nav.title === 'string' ? (
                      <div className="text-white font-light">{nav.title}</div>
                    ) : (
                      nav.title
                    )}
                  </div>
                </Link>
              ) : (
                <div>
                  {typeof nav.title === 'string' ? (
                    <div className="text-white font-light">{nav.title}</div>
                  ) : (
                    nav.title
                  )}
                </div>
              )}
              {nav.subMenu?.length && (
                <div className="transition-opacity group-hover:opacity-100 opacity-0 mt-2 shadow-lg px-2 py-1 absolute z-20 bg-white rounded-xl left-0 right-0 top-full">
                  {nav.subMenu?.map((subMenu, j) => (
                    <div
                      key={j}
                      className="cursor-pointer font-light mb-2 last:mb-0"
                    >
                      {subMenu.isExternal ? (
                        <a target="__blank" href={subMenu.url}>
                          {subMenu.title}
                        </a>
                      ) : (
                        <Link href={subMenu.url}>{subMenu.title}</Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Menu onClick={() => onExpand(true)} className="text-white lg:hidden" />
      </div>
    </>
  );
}

export default Navbar;
