import Image from 'next/legacy/image'
import Link from 'next/link'

import Verification from '~/app/components/Verification'
import { getClient } from '~/sanity/lib/sanity.client'
import { getHomePage } from '~/sanity/lib/sanity.queries'

import Slider from './components/Slider'

export default async function HomePage() {
  const client = getClient()

  const homePageData = await getHomePage(client, {
    next: {
      revalidate: 10,
    },
  })

  return (
    <>
      {/* Age Verification Popup */}
      <Verification />

      {/* Content and Link to Posts */}
      <Link href="/posts" className="block relative h-[100vh] w-full">
        <section className="relative h-full w-full flex flex-col justify-start md:justify-center p-4 items-start overflow-x-hidden overflow-y-hidden">
          {/* Content Container */}
          <div className="relative flex-1 w-full  border-2 shadow-lg shadow-gray-500 flex overflow-hidden max-w-full h-full">
            {/* Slider */}
            <div className="w-full h-full">
              <Slider images={homePageData?.mainImages} />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="absolute bottom-6 md:bottom-2 inset-x-0 text-center px-4 pointer-events-none">
            <h1 className="upper text-white max-[360px]:text-[48px] text-[50px] md:text-[70px] -mb-2 md:mb-[-16px] break-words leading-tight">
              Joël Bardeau
            </h1>
            <h2 className="text-white text-2xl md:text-3xl font-light leading-normal">
              Artiste Auteur
            </h2>
          </div>
        </section>
      </Link>
    </>
  )
}
