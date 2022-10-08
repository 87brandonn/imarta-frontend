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
          <Image
            src="/logo-imarta-transparent.png"
            width={50}
            height={50}
            className="text-white"
            alt="logo-navbar"
          />
          <div className="text-white font-light cursor-pointer">
            Galeri Lawang
          </div>
          <div className="text-white font-light cursor-pointer">Bursa</div>
        </div>
        <Menu className="text-white lg:hidden" />
      </div>
    </>
  );
}

export default Navbar;
