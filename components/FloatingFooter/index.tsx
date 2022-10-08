import Image from 'next/image';
import React from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'react-feather';

function FloatingFooter() {
  return (
    <div className="flex select-none justify-between items-center fixed bottom-0 left-0 right-0">
      <Image
        src="/logo-imarta-2.png"
        width={75}
        height={75}
        alt="logo-footer"
      />
      <div className="flex gap-3 items-center px-3">
        <Instagram size={32} />
        <Linkedin size={32} />
        <Mail size={32} />
        <Phone size={32} />
      </div>
    </div>
  );
}

export default FloatingFooter;
