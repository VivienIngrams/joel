"use client";
import { Menu,MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 w-full z-5 mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex items-center justify-between h-12 md:h-16">
      <Link
        href="/"
        className="hover:bg-black/10 md:px-3 py-2 rounded-md text-[22px] md:text-[32px] text-black"
      >
        Joël Bardeau
      </Link>
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Menu as="div" className="relative">
                <MenuButton className="hover:bg-black/10 px-3 py-2 rounded-md text-[16px] font-semibold">
                  Projets
                </MenuButton>
                <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[rgba(227,224,220)] ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/project/au-cafe"
                          className={`block px-4 py-2 text-md ${
                            active ?  "bg-[#cbc7c2] " : ""
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
                          className={`block px-4 py-2 text-md ${
                             active ?  "bg-[#cbc7c2] " : ""
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
                          className={`block px-4 py-2 text-md ${
                          active ?  "bg-[#cbc7c2] " : ""
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
                          className={`block px-4 py-2 text-md ${
                             active ?  "bg-[#cbc7c2] " : ""
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
                          className={`block px-4 py-2 text-md ${
                             active ?  "bg-[#cbc7c2] " : ""
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
                             active ?  "bg-[#cbc7c2] " : ""
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
                          className={`block px-4 py-2 text-md ${
                             active ?  "bg-[#cbc7c2] " : ""
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
                className="hover:bg-black/10 px-3 py-2 rounded-md text-md font-semibold"
              >
                Ma vie ordinaire
              </Link>
              <Link
                href="/project/voyages"
                className="hover:bg-black/10 px-3 py-2 rounded-md text-md font-semibold"
              >
                Voyages
              </Link>
              <Link
                href="/bio"
                className="hover:bg-black/10 px-3 py-2 rounded-md text-md font-semibold"
              >
                Bio
              </Link>
              <Link
                href="/info"
                className="hover:bg-black/10 px-3 py-2 rounded-md text-md font-semibold"
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
            <MenuButton className="hover:bg-black/10 block px-3 py-2 rounded-md text-base font-semibold">
              Projets
            </MenuButton>
            <MenuItems className="origin-top-right absolute right-0 mt-2 bg-[rgba(227,224,220)] w-full rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/project/au-cafe"
                      className={`block px-4 py-2 text-base ${
                        active ?  "bg-[#cbc7c2] " : ""
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
                         active ?  "bg-[#cbc7c2] " : ""
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
                       active ?  "bg-[#cbc7c2] " : ""
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
                         active ?  "bg-[#cbc7c2] " : ""
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
                         active ?  "bg-[#cbc7c2] " : ""
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
                         active ?  "bg-[#cbc7c2] " : ""
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
                         active ?  "bg-[#cbc7c2] " : ""
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
            className="hover:bg-black/10 block px-3 py-2 rounded-md text-base font-semibold"
          >
            Ma vie ordinaire
          </Link>
          <Link
            href="/project/voyages"
            className="hover:bg-black/10 block px-3 py-2 rounded-md text-base font-semibold"
          >
            Voyages
          </Link>
          <Link
            href="/bio"
            className="hover:bg-black/10 block px-3 py-2 rounded-md text-base font-semibold"
          >
            Bio
          </Link>
          <Link
            href="/info"
            className="hover:bg-black/10 block px-3 py-2 rounded-md text-base font-semibold"
          >
            Info
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;