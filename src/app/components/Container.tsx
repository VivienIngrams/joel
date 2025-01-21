'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import BackButton from './BackButton'
import Footer from './Footer'
import LanguageSwitcher from './LanguageSwitcher'
import SubMenu from './SubMenu'

export default function Container({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isHomePage = path === '/'
  const isContactPage = path === '/contact'
  const isGaleriePage = path === '/posts'
  const isCollaborationsPage = path === '/posts/collaborations'
  const isProjetsPage = path === '/posts/projets'
  const isCollaborationsSousPage = [
    '/posts/mathilde',
    '/posts/vibrations',
    '/posts/johanna',
  ].includes(path)
  const isProjetsSousPage = [
    '/posts/memento',
    '/posts/dante-extraits',
  ].includes(path)
  const isSousPage =
    path.startsWith('/posts/') &&
    !isProjetsPage &&
    !isProjetsSousPage &&
    !isCollaborationsSousPage &&
    !isCollaborationsPage // Exclude Projets and Collaborations subpages
  const isStudioPage = path.startsWith('/studio') // Check if the path starts with /studio

  // State for managing the contact form visibility
  const [isFormOpen, setIsFormOpen] = useState(false)

  const openForm = () => {
    setIsFormOpen(true) // Show the form
  }

  const closeForm = () => {
    setIsFormOpen(false) // Hide the form
  }

  if (isStudioPage) {
    // If it's the /studio path, return only the children without the container
    return <>{children}</>
  }

  // Logic for determining the posts to display in SubMenu
  let posts = []
  if (isGaleriePage || isSousPage) {
    posts = [
      { href: '/posts/autoportraits', title: 'Autoportraits' },
      { href: '/posts/survol', title: 'Survol' },
      { href: '/posts/hors-d-age', title: 'Hors-d’âge' },
      { href: '/posts/respiration', title: 'Respiration' },
      { href: '/posts/derision', title: 'Dérision' },
      { href: '/posts/collaborations', title: 'Collaborations' },
      { href: '/posts/projets', title: 'Projets Actuels' },
      { href: '/posts/images-du-jour', title: 'Images du Jour' },
    ]
  } else if (isProjetsSousPage || isProjetsPage) {
    posts = [
      { href: '/posts/memento', title: 'Memento' },
      { href: '/posts/dante-extraits', title: 'Dante Extraits' },
    ]
  } else if (isCollaborationsSousPage || isCollaborationsPage) {
    posts = [
      { href: '/posts/vibrations', title: 'VIBRATION(S)' },
      { href: '/posts/mathilde', title: 'Mathilde Cudeville' },
      { href: '/posts/johanna', title: 'Johanna Senpau' },
    ]
  }

  return (
    <div className="max-w-screen h-full font-ubuntu">
     
        <div
          className={`${
            isHomePage
              ? 'hidden'
              : 'fixed  top-0 z-50 h-24 w-full md:h-24 bg-white flex flex-col items-center justify-center'
          }`}
        >
          <BackButton
            show={
              (isProjetsPage || isCollaborationsPage) &&
              !isCollaborationsSousPage &&
              !isProjetsSousPage
            }
            href="/posts"
          />
          <BackButton
            show={isCollaborationsSousPage}
            href="/posts/collaborations"
          />
          <BackButton show={isProjetsSousPage} href="/posts/projets" />
          <BackButton show={isSousPage} href="/posts" />
          {(isGaleriePage ||
            isSousPage ||
            isProjetsSousPage ||
            isProjetsPage ||
            isCollaborationsSousPage ||
            isCollaborationsPage) && <SubMenu posts={posts} />}
          <Link href={isHomePage ? '/posts' : '/'}>
            <h1
              className={`${isHomePage ? 'hidden' : 'text-black font-montserrat uppercase font-normal  hover:text-gray-500 text-3xl tracking-[-0.rem] text-center md:pb-4'}`}
            >
              <span className="text-[40px] font-light    tracking-[-0.65rem] ">
                J
              </span>{' '}
              oël{' '}
              <span className="text-[40px]   font-light tracking-[-0.05rem]">
                B
              </span>
              ardeau
            </h1>
          </Link>
          <div className='hidden md:block'>
          <LanguageSwitcher/></div>
        </div>

        <main className="w-full font-arsenal">{children}</main>

        {/* Footer */}
        <Footer isHomePage={isHomePage} isContactPage={isContactPage} />
      
    </div>
  )
}
