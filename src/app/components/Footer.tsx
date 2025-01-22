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

      {/* Website Link */}
      <div
        className={` ${
          isContactPage ? 'block' : 'hidden'
        }`}
      >
        <Link
          href="https://vivieningrams.com"
          className={`font-arsenal text-gray-500 hover:text-black tracking-normal leading-loose ${
            isContactPage
              ? 'fixed right-4 bottom-12 md:relative md:left-2 md:bottom-0 text-[12px]'
              : ''
          }`}
        >
          Website by Vivien Ingrams
        </Link>
      </div>

      <NavMenu />

      {/* Social Icons */}
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
