import Image from 'next/legacy/image'
import Link from 'next/link'

import Verification from '~/app/components/Verification'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image';
import { getHomePage } from '~/sanity/lib/sanity.queries'

export default async function HomePage() {
  const client = getClient()

  const homePageData = await getHomePage(client, {
    next: {
      revalidate: 600,
      cache: 'no-store',
    },
  })

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
          
        <Image
            className="object-cover md:object-bottom"
            src={urlForImage(homePageData.mainImages[0]).url() || ''}
            layout="fill"
            sizes="100vw"
            alt="Home Page Background"
          />

          {/* Title and Subtitle */}
          <div className="fixed left-1/2 -translate-x-1/2 text-amber-950 bottom-2 md:bottom-1/2  text-center">
            <h1 className="text-center md:text-left  text-[50px] md:text-[100px] uppercase tracking-tighter leading-[40px]">
              <span className="text-6xl leading-[40px] md:text-9xl tracking-[-1.6rem] ">
                J
              </span>{' '}
              oël{' '}
              <span className="text-6xl leading-[40px] md:text-9xl tracking-[-0.5rem]">
                B
              </span>
              ardeau
            </h1>
            <h2 className=" text-2xl md:text-4xl font-light leading-normal md:-mt-2">
              Artiste Auteur
            </h2>
          </div>
        </section>
      </Link>
    </>
  )
}
