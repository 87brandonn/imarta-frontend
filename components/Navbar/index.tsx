import React, { useRef, useState } from 'react';
import { ChevronDown, Menu } from 'react-feather';
import Link from 'next/link';
import Image from 'next/future/image';
import useOutsideAlerter from '../../utils/useOutsideAlerter';

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
        url: 'https://issuu.com/imartasketsa'
      },
      {
        title: 'ARTHUR',
        isExternal: false,
        url: '/arthur'
      },
      {
        title: 'Majalah SKETSA',
        isExternal: true,
        url: 'https://majalahsketsa.com'
      },
      {
        title: 'ADW',
        isExternal: true,
        url: 'https://www.instagram.com/architecturaldesignweek.id/?hl=en'
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
            className="w-full h-10 lg:h-12 object-cover"
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
    title: 'Bursa IMARTA',
    href: '/bursa-imarta'
  }
];

function Navbar({ onExpand }: NavbarProps) {
  const [expand, setExpand] = useState<Record<string, boolean>>();
  const boxRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(boxRef, () => {
    setExpand(undefined);
  });

  return (
    <>
      <div className="bg-[#282828] py-3 px-2">
        <div className="select-none hidden max-w-4xl mx-auto lg:flex justify-between items-center">
          {navbarData.map((nav, i) => (
            <div className="flex-1 justify-center flex relative" key={i}>
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
                <>
                  <ChevronDown
                    className={`cursor-pointer text-white transform ${
                      expand?.[nav.title] ? 'rotate-180' : 'rotate-0'
                    } transition-transform`}
                    onClick={() =>
                      setExpand(prev => ({
                        ...prev,
                        [nav.title]: !prev ? true : !prev[nav.title]
                      }))
                    }
                  />
                  {expand?.[nav.title] && (
                    <div
                      ref={boxRef}
                      className="transition-opacity opacity-100 mt-2 shadow-lg px-2 py-1 absolute z-20 bg-white rounded-xl left-0 right-0 top-full"
                    >
                      {nav.subMenu?.map((subMenu, j) => (
                        <div
                          key={j}
                          className="hover:font-medium font-light mb-2 last:mb-0"
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
                </>
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
