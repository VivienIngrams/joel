'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()
  const isHomePage = path === '/'

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full z-50 mx-auto sm:px-6 md:pl-24 font-barlow tracking-tight uppercase">
      <div
        className={`flex items-start justify-start md:justify-center text-lg  ${
          isHomePage ? 'text-blue-950 md:text-3xl font-normal md:pb-16' : 'md:text-xl font-light '
        }`}
      >
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className=" flex items-baseline space-x-4">
              <Link
                href="/posts"
                className="hover:bg-white/10 rounded-md px-3   text-md  "
              >
                Galerie
              </Link>
              <Link
                href="/videos"
                className="hover:bg-white/10 rounded-md px-3  text-md  "
              >
                Videos
              </Link>

              <Link
                href="/info"
                className="hover:bg-white/10 rounded-md px-3  "
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
            className="inline-flex  "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="block h-6 w-6 -mb-20 -ml-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M19 5L4.99998 19M5.00001 5L19 19"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            ) : (
              <svg
                className="h-16 w-16 -m-4"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="184px"
                height="184px"
                viewBox="0 0 100.00 100.00"
                enableBackground="new 0 0 100 100"
                xmlSpace="preserve"
                fill="#eee"
                stroke="#eee"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="Hamburguer">
                    <path
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      d=" M33.791,33.604c4.528-4.528,10.462-6.791,16.396-6.791c5.934,0,11.868,2.264,16.396,6.791c4.527,4.527,6.79,10.459,6.791,16.392 c0.001,5.936-2.263,11.872-6.791,16.4c-9.055,9.055-23.737,9.055-32.792,0S24.736,42.659,33.791,33.604z"
                    ></path>{' '}
                    <g>
                      {' '}
                      <line
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        x1="58.187"
                        y1="50"
                        x2="42.187"
                        y2="50"
                      ></line>{' '}
                      <line
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        x1="58.187"
                        y1="42"
                        x2="42.187"
                        y2="42"
                      ></line>{' '}
                      <line
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        x1="58.187"
                        y1="58"
                        x2="42.187"
                        y2="58"
                      ></line>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>
              </svg>
            )}{' '}
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? 'block bg-gradient-to-b from-transparent via-[#091129] to-[#091129] w-screen pt-12 -ml-4 -mb-4' : 'hidden'} md:hidden`}
        id="mobile-menu"
        onClick={toggleMenu}
      >
        <div className="text-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/posts"
            className=" block px-3 py-2  text-base  "
          >
            Galerie
          </Link>
          <Link
            href="/videos"
            className=" block px-3 py-2  text-base  "
          >
            Videos
          </Link>
          <Link
            href="/info"
            className=" block px-3 py-2  text-base  "
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavMenu
