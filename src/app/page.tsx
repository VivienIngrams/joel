import Image from 'next/legacy/image'
import Link from 'next/link'

import Verification from '~/app/components/Verification'
import { getClient } from '~/sanity/lib/sanity.client'
import { getHomePage } from '~/sanity/lib/sanity.queries'

import Slider from './components/Slider'

export default async function HomePage() {
  // Get the Sanity client
  const client = getClient()

  // Fetch the home page data
  const homePageData = await getHomePage(client, {
    next: {
      revalidate: 5,
      cache: 'no-store',
    },
  })

  return (
    <section className="relative h-[calc(100vh)] w-full  flex flex-col justify-start md:justify-center p-12 md:p-[20px] items-start  md:pl-[230px]">
    {/* Display the age verification popup component */}
    <Verification />
  
    {/* Content container */}
    <div className="relative flex-1 w-full border-white border-2 shadow-lg flex overflow-hidden">
      {/* Slider */}
      <div className="w-full h-full">
        <Slider images={homePageData?.mainImages} />
      </div>
    </div>
  
    {/* Title and Subtitle in left margin */}
    <div className="absolute bottom-0 md:top-1/2 md:left-2 md:transform md:-translate-y-1/2">
      <Link href={'/posts'} className=''>
        <h1 className="uppercase text-white text-5xl md:text-8xl ">
          Joël Bardeau
        </h1>
        <h2 className="text-white text-xl md:text-lg font-light">
          Artiste Auteur
        </h2>
      </Link>
    </div>
  </section>
  
  
  )
}
