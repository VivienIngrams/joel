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
    <section className="relative h-screen w-full flex flex-col justify-center items-center">
    {/* Display the age verification popup component */}
    <Verification />
  
    {/* Only show the background image if the user is over 18 */}
    <Slider images={homePageData?.mainImages} />
  
    {/* Centered text at the middle of the screen */}
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
      <div className='border-2 border-white p-4'>
      <Link href={'/posts'}>
        <h1 className="uppercase text-white text-5xl md:text-8xl  ">
          Joël Bardeau
        </h1>
        <h2 className="text-white text-3xl md:text-5xl font-light">
          Artiste Photographe Plasticien
        </h2>
      </Link></div>
    </div>
  </section>
  
  
  )
}
