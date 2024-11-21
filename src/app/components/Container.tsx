'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { TbArrowBackUp } from 'react-icons/tb'

import NavMenu from './NavMenu'

export default function Container({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isHomePage = path === '/'
  const isPostsPage = path === '/posts'
  const isInfoPage = path === '/info'
  const isStudioPage = path.startsWith('/studio') // Check if the path starts with /studio

  if (isStudioPage) {
    // If it's the /studio path, return only the children without the container
    return <>{children}</>
  }

  return (
    <div className="max-w-screen h-full font-arsenal">
      <div
        className={` flex flex-col items-center justify-center pt-8  ${
          isHomePage
            ? 'absolute top-0 w-full z-10 h-16 md:h-48 text-3xl md:text-5xl '
            : 'fixed top-0 z-50 h-8 w-full md:h-16 text-[22px] md:text-[32px] pb-8 bg-gradient-to-t from-transparent via-black  to-black '
        }`}
      >
        {!isHomePage && !isPostsPage && (
          <Link href="/posts" className="h-8 absolute top-4 left-4">
            <TbArrowBackUp size="1.5rem" />
          </Link>
        )}
        <Link
          href={isHomePage ? '/posts' : '/'}
          // className="hover:bg-white/10"
        >
          <h1
            className={`${isHomePage ? 'uppercase md:text-5xl' : ''} text-center `}
          >
            {' '}
            Joël Bardeau
          </h1>
          {isHomePage && (
            <h2 className="text-white text-xl md:text-2xl font-light text-center">
              Artiste Photographe Plasticien
            </h2>
          )}
        </Link>
      </div>

      <main className="w-screen font-arsenal">{children}</main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full md:h-16 md:pb-6 bg-gradient-to-b from-transparent via-black  to-black px-4 pt-20 md:pt-6 pb-2 flex items-end md:items-center justify-between">
        <div>
          <p className="hidden md:flex  text-[10px] text-neutral-400 xs:tracking-normal  z-55 leading-loose w-40 pt-2">
            Website by Vivien Ingrams
          </p>
        </div>
        <NavMenu />
        <div className="w-[280px]">
          {!isInfoPage && (
            <div className="flex items-end gap-x-4">
              <Link
                href="mailto:info@joelbardeau.com"
                className=" text-sm  text-white  hover:text-neutral-400"
              >
                info@joelbardeau.com{' '}
              </Link>
              <div className="flex gap-x-2 ">
                <Socials />
              </div>
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
    href: 'https://instagram.com/sakiko.oishi?igshid=YjNmNGQ3MDY=',
  },
  {
    label: 'Youtube',
    Icon: FaYoutube,
    href: 'https://www.youtube.com/@TheJbbrava',
  },
  {
    label: 'Facebook',
    Icon: FaFacebook,
    href: 'https://facebook.com/SakikoOISHI',
  },
]

export function Socials() {
  return (
    <>
      {socialLinks.map(({ label, Icon, href }) => (
        <Link
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500  sm:-m-3 sm:p-3"
          href={href}
          key={label}
        >
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
        </Link>
      ))}
    </>
  )
}
