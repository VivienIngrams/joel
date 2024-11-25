// HomePage.tsx (Server-side logic)
import Image from 'next/legacy/image'
import Link from 'next/link'
import { getClient } from '~/sanity/lib/sanity.client'
import { getHomePage } from '~/sanity/lib/sanity.queries'
import Verification from '~/app/components/Verification' // Client-side component

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
      {/* Display the age verification popup component */}
      <Verification />

      {/* Only show the background image if the user is over 18 */}
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
