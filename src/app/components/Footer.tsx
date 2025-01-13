'use client';

import Link from 'next/link';
import NavMenu from './NavMenu';
import Socials from './Socials';

export default function Footer({ isHomePage, isContactPage }: { isHomePage: boolean; isContactPage: boolean }) {
  return (
    <footer
      className={`fixed bottom-0 w-full md:h-8 p-4 pt-4 md:pb-7 flex items-end md:items-center justify-between ${
        isHomePage
          ? 'md:bg-transparent' // Transparent background on the homepage
          : 'bg-white text-gray-500'
      }`}
    >
      {/* Gradient bar */}
      <div
        className={`absolute -top-3 left-0 w-full h-4 ${
          isHomePage
            ? 'md:bg-transparent' // Transparent background on the homepage
            : 'bg-gradient-to-t from-white to-transparent'
        }`}
      ></div>
      <div>
        <Link href="https://vivieningrams.com">
          <p
            className={`font-arsenal text-gray-500 hover:text-black xs:tracking-normal z-55 leading-loose w-[150px] pt-2 ${
              isHomePage && ' '
            }  ${
              isContactPage
                ? 'absolute left-16 md:left-5 bottom-3 md:bottom-0 block h-10 w-30 text-[12px]'
                : 'hidden'
            }`}
          >
            Website by Vivien Ingrams
          </p>
        </Link>
      </div>
      <NavMenu />
      <div className="z-50">
        {!isHomePage && (
          <div className="flex items-end mb-2 gap-x-3">
            <div className="flex gap-x-3">
              <Socials />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
