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
      revalidate: 30,
      cache: 'no-store',
    },
  })
console.log(homePageData)
  return (
    <>
      {/* Age Verification Popup */}
      <Verification />

      {/* Entire Page Clickable */}
      <Link
        href="/posts"
        className="block relative h-[100vh] w-full overflow-hidden"
      >
        <section className="relative h-full w-full flex flex-col justify-start md:justify-center items-start">
          {/* Content Container */}
          <div className="relative flex-1 w-full shadow-lg shadow-gray-800 flex overflow-hidden h-full">
            {/* Slider */}
            <div className="w-full h-full">
              <Slider images={homePageData?.mainImages} />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="fixed left-1/2 -translate-x-1/2 md:translate-x-0 bottom-2 md:left-4 md:top-2 text-center">
            <h1 className="text-center md:text-left text-white text-[50px] md:text-[60px] uppercase tracking-tight leading-[40px]">
              <span className="text-6xl leading-[40px] md:text-7xl tracking-[-0.9rem] ">
                J
              </span>{' '}
              oël{' '}
              <span className="text-6xl leading-[40px] md:text-7xl tracking-[-0.05rem]">
                B
              </span>
              ardeau
            </h1>
            <h2 className="text-white text-2xl md:text-3xl font-light leading-normal md:-mt-2">
              Artiste Auteur
            </h2>
          </div>
        </section>
      </Link>
    </>
  )
}
