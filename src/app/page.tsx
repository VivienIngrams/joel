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
          <div className="relative flex-1 w-full  shadow-lg shadow-gray-800 flex overflow-hidden max-w-full h-full">
            {/* Slider */}
            <div className="w-full h-full">
              <Slider images={homePageData?.mainImages} />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="absolute left-4 top-12  inset-x-0  px-4 pointer-events-none">
            <h1 className=" text-left text-white text-[50px] md:text-[60px] uppercase break-words leading-tight">
              Joël Bardeau
            </h1>
            <h2 className="text-white text-2xl md:text-3xl font-light leading-normal -mt-2">
              Artiste Auteur
            </h2>
          </div>
        </section>
      </Link>
    </>
  )
}
