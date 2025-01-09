'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { PiArrowBendUpLeftLight } from "react-icons/pi";


import NavMenu from './NavMenu'

export default function Container({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isHomePage = path === '/'
  const isPostsPage = path === '/posts'
  const isInfoPage = path === '/info'

  const isProjetsPage = ['/posts/projets', '/posts/publiees'].includes(path)
  const isPublieesSousPage = [
    '/posts/mathilde',
    '/posts/delphine',
    '/posts/johanna',
  ].includes(path)
  const isProjetsSousPage = [
    '/posts/memento',
    '/posts/vibrations',
    '/posts/dante-extraits',
  ].includes(path)
  const isSousPage =
    path.startsWith('/posts/') && !isProjetsSousPage && !isPublieesSousPage // Exclude Projets and Publiees subpages
  const isStudioPage = path.startsWith('/studio') // Check if the path starts with /studio

  if (isStudioPage) {
    // If it's the /studio path, return only the children without the container
    return <>{children}</>
  }

  return (
    <div className="max-w-screen h-full font-ubuntu">
      <div
        className={`${
          isHomePage
            ? 'hidden' 
            : 'fixed  top-0 z-50 h-16 w-full md:h-24 py-6 bg-white flex flex-col items-center justify-center'
        }`}
      >
        {isProjetsPage && !isPublieesSousPage && !isProjetsSousPage && (
  <Link href="/posts" className="h-12 absolute top-3 md:top-4 left-3 md:left-5">
    <PiArrowBendUpLeftLight className="text-gray-500 hover:text-black text-[1.5rem] md:text-[2.5rem]" />
  </Link>
)}

{isPublieesSousPage && !isProjetsSousPage && (
  <Link
    href="/posts/publiees"
    className="h-12 absolute top-3 md:top-4 left-2 md:left-5"
  >
    <PiArrowBendUpLeftLight className="text-gray-500 hover:text-black text-[1.5rem] md:text-[2.5rem]" />
  </Link>
)}

{isProjetsSousPage && !isPublieesSousPage && (
  <Link
    href="/posts/projets"
    className="h-12 absolute top-3 md:top-4 left-2 md:left-5"
  >
    <PiArrowBendUpLeftLight className="text-gray-500 hover:text-black text-[1.5rem] md:text-[2.5rem]" />
  </Link>
)}

{isSousPage &&
  !isProjetsSousPage &&
  !isPublieesSousPage &&
  !isProjetsPage && (
    <Link
      href="/posts"
      className="h-10 absolute top-3 md:top-4 left-2 md:left-5"
    >
      <PiArrowBendUpLeftLight className="text-gray-500 hover:text-black text-[1.5rem]  md:text-[2.5rem]" />
    </Link>
  )}

        <Link href={isHomePage ? '/posts' : '/'}>
          <h1 className={`${isHomePage ? 'hidden' : 'text-black font-montserrat uppercase font-normal md:font-light hover:text-gray-500 text-3xl tracking-[-0.rem] md:text-5xl text-center'}`}>
           <span className='text-4xl font-light md:font-lighter md:text-[55px]   tracking-[-0.6rem] md:tracking-[-1rem]'>J</span> oël <span className='text-4xl  md:text-[55px] font-light md:font-lighter tracking-[-0.1rem]'>B</span>ardeau
          </h1>
        </Link>
      </div>

      <main className="w-full font-arsenal">{children}</main>

      {/* Footer */}
      <footer
        className={`fixed bottom-0 w-full md:h-16 md:pb-6 px-4 pt-10 md:pt-6 pb-4 flex items-end md:items-center justify-between ${
          isHomePage
            ? ' md:bg-transparent md:text-gray-500' // Transparent background with dark blue text on the homepage
            : 'bg-gradient-to-b from-transparent via-white to-white text-gray-500'
        }`}
      >
        <div>
          <Link href="https://vivieningrams.com">
          <p
            className={`font-arsenal  text-gray-500 hover:text-black xs:tracking-normal z-55  leading-loose w-[150px] pt-2 ${
              isHomePage && ' '
            }  ${isInfoPage ?  'absolute right-0 md:left-5 bottom-0 block h-10 w-30   text-[12px] ' : 'hidden'}`}
          >
            Website by Vivien Ingrams
          </p></Link>
        </div>
        <NavMenu />
        
        <div className="z-50">
          {!isInfoPage && !isHomePage && (
            <div className="flex items-end gap-x-3">
              <div className="flex gap-x-3">
                <Socials />
              </div>
              <Link
                href="mailto:info@joelbardeau.com"
                className={` ${
                  isHomePage ? 'hidden' : 'block'
                }`}
              >
              <AiOutlineMail className="text-gray-500 hover:text-black text-[20px] md:text-[24px]" />
              </Link>
              
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

interface Social {
  label: string
  Icon: React.ComponentType<{ className: string }>
  href: string
}

const socialLinks: Social[] = [
  {
    label: 'Instagram',
    Icon: FaInstagram,
    href: 'https://www.instagram.com/joel.bardeau.photo',
  },
  {
    label: 'Youtube',
    Icon: FaYoutube,
    href: 'https://www.youtube.com/@TheJbbrava',
  },
  {
    label: 'Facebook',
    Icon: FaFacebook,
    href: 'https://www.facebook.com/joel.bardeau.photo',
  },
]

export function Socials() {
  return (
    <>
      {socialLinks.map(({ label, Icon, href }) => (
        <Link
          aria-label={label}
          className=" rounded-md  transition-all duration-300  sm:-m-3 sm:p-3 hover:text-black"
          href={href}
          key={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
        </Link>
      ))}
    </>
  )
}
