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
    <nav className="w-full z-50 mx-auto sm:px-6 lg:px-8 font-arsenal uppercase">
      <div
        className={`flex items-start justify-start md:justify-center  text-lg md:text-xl `}
      >
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className=" flex items-baseline space-x-4">
              <Link
                href="/posts"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Oeuvres
              </Link>
              {/* <Link
                href="/livres"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Livres
              </Link>
              <Link
                href="/expositions"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Expositions
              </Link>
              <Link
                href="/biography"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Biography
              </Link> */}
              <Link
                href="/info"
                className="hover:bg-white/10 px-3 py-2  text-md  "
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
                className="block h-6 w-6 mt-12 -ml-2"
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
                    stroke="#d0cbcb"
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
                  stroke="#CCCCCC"
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
            {/* <svg viewBox="0 0 22 22" className="h-8 w-8 mb-2" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16ZM18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H18ZM18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" fill="#ffff"></path> </g></svg>            )} */}
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
        onClick={toggleMenu}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/posts"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Oeuvres
          </Link>
          <Link
            href="/expositions"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Expositions
          </Link>
          <Link
            href="/biography"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Biography
          </Link>
          <Link
            href="/info"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavMenu
