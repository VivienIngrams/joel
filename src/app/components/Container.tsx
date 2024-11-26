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

 const isProjetsPage = ['/posts/projets',  '/posts/publiees'].includes(path)
 const isPublieesSousPage = ['/posts/mathilde', '/posts/delphine', '/posts/johanna'].includes(path)
 const isProjetsSousPage = ['/posts/memento', '/posts/vibrations', '/posts/dante-extraits'].includes(path)
  const isSousPage = path.startsWith('/posts/') // Check if the path starts with /posts/
  const isStudioPage = path.startsWith('/studio') // Check if the path starts with /studio

  if (isStudioPage) {
    // If it's the /studio path, return only the children without the container
    return <>{children}</>
  }

  return (
    <div className="max-w-screen h-full font-arsenal">
      <div
        className={`${
          isHomePage
            ? 'absolute top-0 left-0 w-full z-10 h-16 md:h-48 text-blue-950 bg-transparent pl-4 pt-4 md:pl-8 md:pt-8' // Dark blue, aligned left
            : 'fixed top-0 z-50 h-8 w-full md:h-16 text-[22px] md:text-[32px] pb-8 bg-gradient-to-t from-transparent via-[#091129] to-[#091129] flex flex-col items-center justify-center pt-8'
        }`}
      >
        {isProjetsPage && (
          <Link href="/posts" className="h-8 absolute top-4 left-4">
            <TbArrowBackUp size="1.5rem" /> 
          </Link>
        )}
        {isPublieesSousPage && (
          <Link href="/posts/publiees" className="h-8 absolute top-4 left-4">
            <TbArrowBackUp size="1.5rem" /> 
          </Link>
        )}
        {isProjetsSousPage && (
          <Link href="/posts/projets" className="h-8 absolute top-4 left-4">
            <TbArrowBackUp size="1.5rem" />
          </Link>
        )}
        {isSousPage && !isProjetsSousPage && !isPublieesSousPage && (
          <Link href="/posts" className="h-8 absolute top-4 left-4">
            <TbArrowBackUp size="1.5rem" />
          </Link>
        )}
        <Link href={isHomePage ? '/posts' : '/'}>
          <h1
            className={`${isHomePage ? 'uppercase md:text-5xl ' : ' text-center'}`}
          >
            Joël Bardeau
          </h1>
          {isHomePage && (
            <h2 className="text-blue-950 text-xl md:text-2xl font-light">
              Artiste Photographe Plasticien
            </h2>
          )}
        </Link>
      </div>

      <main className="w-screen font-arsenal">{children}</main>

      {/* Footer */}
      <footer
        className={`fixed bottom-0 w-full md:h-16 md:pb-6 px-4 pt-10 md:pt-6 pb-4 flex items-end md:items-center justify-between ${
          isHomePage
            ? ' md:bg-transparent md:text-[#091129]' // Transparent background with dark blue text on the homepage
            : 'bg-gradient-to-b from-transparent via-[#091129] to-[#091129] text-white'
        }`}
      >
        <div>
          <p
            className={`hidden  md:flex text-[#091129] -mb-5 xs:tracking-normal z-55 leading-loose w-[150px] pt-2 ${
              isHomePage
                && 'text-[#f9f3b8]  text-xs -ml-2  font-light font-barlow'
              
            }  ${isInfoPage && 'text-neutral-300 text-[11px] '}`}
          >
            Website by Vivien Ingrams
          </p>
        </div>
        <NavMenu />
        <div className="md:w-[350px]">
          {!isInfoPage && !isHomePage && (
            <div className="flex items-end gap-x-4">
              <Link
                href="mailto:info@joelbardeau.com"
                className={`text-sm hover:text-neutral-400 ${
                  isHomePage ? 'text-[#091129]' : 'text-white'
                }`}
              >
                info@joelbardeau.com{' '}
              </Link>
              <div className="flex gap-x-2">
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
     className=" rounded-md  transition-all duration-300  sm:-m-3 sm:p-3"
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
