"use client";
import { Menu,MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const isHomePage = path === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 w-full z-50 mx-auto px-4 sm:px-6 lg:px-8 font-barlow">
      <div
        className={`flex items-center justify-center ${
          isHomePage ? "h-16 md:h-32 text-3xl md:text-6xl " : "h-8 md:h-12 text-[22px] md:text-[32px]"
        }`}
      >
      <Link
        href="/"
        className="hover:bg-white/10 px-20 py-4 hover:rounded-2xl  border-b-gray-500 border-b-[1px]"
      >
        Joël Bardeau
      </Link>
      </div>
      <div className={`flex items-start justify-center ${
          isHomePage ? "h-16 md:h-32 text-xl md:text-2xl " : "h-8 md:h-12 text-[22px] md:text-[32px]"
        }`}>
      
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className=" flex items-baseline space-x-4">
              <Menu as="div" className="relative">
                <MenuButton className="hover:bg-white/10 px-3 py-2 text-white rounded-md ">
                  Projets
                </MenuButton>
                <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg border-[1px] border-gray-600 focus:outline-none">
                  <div className="py-1">
                    
                    
                    
                    
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/project/mirante"
                          className={`block px-4 py-2 text-md ${
                             active ?  "bg-black " : ""
                          }`}
                        >
                          Mirante
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/project/en-suspension-s"
                          className={`block px-4 py-2 text-md ${
                             active ?  "bg-black " : ""
                          }`}
                        >
                          En Suspension-(S)
                        </Link>
                      )}
                    </MenuItem>
                   
                  </div>
                </MenuItems>
              </Menu>
              
              <Link
                href="/project/voyages"
                className="hover:bg-white/10 px-3 py-2 rounded-md text-md  "
              >
                Voyages
              </Link>
              <Link
                href="/bio"
                className="hover:bg-white/10 px-3 py-2 rounded-md text-md  "
              >
                Bio
              </Link>
              <Link
                href="/info"
                className="hover:bg-white/10 px-3 py-2 rounded-md text-md  "
              >
                Info
              </Link>
            </div>
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="block h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#5b2e16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            ) : (
              <svg className="block h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Menu_Duo_LG"> <path id="Vector" d="M3 15H21M3 9H21" stroke="#5b2e16" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
              
            )}
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Menu as="div" className="relative">
            <MenuButton className="hover:bg-white/10 block px-3 py-2 rounded-md text-base  ">
              Projets
            </MenuButton>
            <MenuItems className="origin-top-right absolute right-0 mt-2 bg-[rgba(227,224,220)] w-full rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/au-cafe"
                      className={`block px-4 py-2 text-base ${
                        active ?  "bg-black " : ""
                      }`}
                    >
                      Au café
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/la-passagere"
                      className={`block px-4 py-2 text-base ${
                         active ?  "bg-black " : ""
                      }`}
                    >
                      La Passagère
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/interieur"
                      className={`block px-4 py-2 text-base ${
                       active ?  "bg-black " : ""
                      }`}
                    >
                      Intérieur
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/sentiment-oceanique"
                      className={`block px-4 py-2 text-base ${
                         active ?  "bg-black " : ""
                      }`}
                    >
                      Sentiment océanique
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/mirante"
                      className={`block px-4 py-2 text-base ${
                         active ?  "bg-black " : ""
                      }`}
                    >
                      Mirante
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/en-suspension-s"
                      className={`block px-4 py-2 text-base ${
                         active ?  "bg-black " : ""
                      }`}
                    >
                      En Suspension-(S)
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/reveler"
                      className={`block px-4 py-2 text-base ${
                         active ?  "bg-black " : ""
                      }`}
                    >
                      Révéler
                    </Link>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          <Link
            href="/project/ma-vie-ordinaire"
            className="hover:bg-white/10 block px-3 py-2 rounded-md text-base  "
          >
            Ma vie ordinaire
          </Link>
          <Link
            href="/project/voyages"
            className="hover:bg-white/10 block px-3 py-2 rounded-md text-base  "
          >
            Voyages
          </Link>
          <Link
            href="/bio"
            className="hover:bg-white/10 block px-3 py-2 rounded-md text-base  "
          >
            Bio
          </Link>
          <Link
            href="/info"
            className="hover:bg-white/10 block px-3 py-2 rounded-md text-base  "
          >
            Info
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;