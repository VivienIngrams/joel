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
    <section className="relative h-[calc(100vh)] w-full  flex flex-col justify-center p-[20px] items-start  pl-[300px]">
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
    <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
      <Link href={'/posts'}>
        <h1 className="uppercase text-white text-5xl md:text-7xl">
          Joël Bardeau
        </h1>
        <h2 className="text-white text-xl md:text-4xl font-light">
          Artiste Photographe Plasticien
        </h2>
      </Link>
    </div>
  </section>
  
  
  )
}
