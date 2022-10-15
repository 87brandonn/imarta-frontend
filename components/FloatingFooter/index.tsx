import Image from 'next/future/image';
import React from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'react-feather';

function FloatingFooter() {
  return (
    <div className="flex select-none justify-between items-center fixed bottom-2 z-20 left-4 right-4">
      <div className="bg-white p-1 transform transition-transform hover:scale-125 shadow-xl cursor-pointer rounded-full">
        <Image
          src="/logo-imarta-2.png"
          width="0"
          height="0"
          sizes="100vw"
          className="w-10 h-10 object-contain"
          alt="logo-footer"
        />
      </div>
      <div className="flex gap-3 items-center px-3">
        <div className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2">
          <Instagram size={24} />
        </div>
        <div className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2">
          <Linkedin size={24} />
        </div>
        <div className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2">
          <Mail size={24} />
        </div>
        <div className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2">
          <Phone size={24} />
        </div>
      </div>
    </div>
  );
}

export default FloatingFooter;
