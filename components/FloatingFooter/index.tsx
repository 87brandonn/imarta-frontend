import Image from 'next/future/image';
import React, { useMemo } from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'react-feather';
import useFloatingFooter from '../../hooks/useFloatingFooter';

function FloatingFooter() {
  const { data } = useFloatingFooter();

  const memoizedFloatingFooterAttributes = useMemo(
    () => data?.sections.find(section => section.name === 'urls')?.attributes,
    [data?.sections]
  );

  const getAttributesByName = (name: string) =>
    memoizedFloatingFooterAttributes?.find(attr => attr.name === name)?.data ||
    undefined;

  return (
    <div className="flex select-none justify-between items-center fixed bottom-2 z-20 left-4 right-4">
      <a
        href={getAttributesByName('sketsa')}
        target="__blank"
        className="bg-white p-1 transform transition-transform hover:scale-125 shadow-xl cursor-pointer rounded-full"
      >
        <Image
          src="/logo-imarta-2.png"
          width="0"
          height="0"
          sizes="100vw"
          className="w-10 h-10 object-contain"
          alt="logo-footer"
        />
      </a>
      <div className="flex gap-3 items-center px-3">
        <a
          href={`https://line.me/R/ti/p/${getAttributesByName('line')}`}
          target="__blank"
          className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2"
        >
          <Image
            sizes="100vw"
            width={24}
            height={24}
            src="/line-logo.png"
            alt="line"
          />
        </a>
        <a
          href={`https://instagram.com/${getAttributesByName('instagram')}`}
          target="__blank"
          className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2"
        >
          <Instagram size={24} />
        </a>
        <a
          href={`${getAttributesByName('linkedin')}`}
          target="__blank"
          className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2"
        >
          <Linkedin size={24} />
        </a>
        <a
          href={`mailto:${getAttributesByName('gmail')}`}
          target="__blank"
          className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2"
        >
          <Mail size={24} />
        </a>
        <a
          href={`tel:${getAttributesByName('phone')}`}
          target="__blank"
          className="bg-white shadow-xl cursor-pointer transform transition-transform hover:scale-125 rounded-full p-2"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}

export default FloatingFooter;
