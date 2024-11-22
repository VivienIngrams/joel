import Image from 'next/legacy/image'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview' // Ensure you're using this if you're in draft mode

import { getClient } from '~/sanity/lib/sanity.client'
import { getHomePage } from '~/sanity/lib/sanity.queries'

export default async function HomePage() {
  // Get the Sanity client
  const client = getClient()

  // Fetch the home page data
  const homePageData = await getHomePage(client, {
    next: {
      revalidate: 10,
      cache: 'no-store',
    },
  })

  return (
    <section className="relative h-screen w-full">
      {/* Use the fetched image data */}
      {homePageData?.image?.asset?.url && (
        <Link href="/posts">
          <Image
            className="object-cover object-[12%] md:object-bottom"
            src={homePageData.image.asset.url}
            layout="fill"
            sizes="100vw"
            alt="Home Page Background"
          />
        </Link>
      )}
    </section>
  )
}
