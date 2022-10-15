import React from 'react';
import { Menu } from 'react-feather';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <>
      <div className="bg-[#282828] py-3 px-2">
        <div className="hidden max-w-4xl mx-auto lg:flex justify-between items-center">
          <Link href="/about">
            <div className="text-white font-light cursor-pointer">About</div>
          </Link>
          <Link href="/repository">
            <div className="text-white font-light cursor-pointer">
              Repository
            </div>
          </Link>
          <Link href="/">
            <div className="flex">
              <div className="w-24 h-12 relative">
                <Image
                  layout="fill"
                  src="/logo-imarta-transparent.png"
                  objectFit="contain"
                  alt="logo-navbar"
                  priority
                />
              </div>
              <div className="w-24 h-12 relative">
                <Image
                  layout="fill"
                  src="/sketsa-white.png"
                  objectFit="contain"
                  alt="logo-navbar"
                  priority
                />
              </div>
            </div>
          </Link>
          <Link href="/galeri-lawang">
            <div className="text-white font-light cursor-pointer">
              Galeri Lawang
            </div>
          </Link>
          <Link href="/bursa-imarta">
            <div className="text-white font-light cursor-pointer">Bursa</div>
          </Link>
        </div>
        <Menu className="text-white lg:hidden" />
      </div>
    </>
  );
}

export default Navbar;
