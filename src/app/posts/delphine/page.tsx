import {
  DelphineMobileScroll,
  DelphineScroll,
} from '~/app/components/DelphineScroll'
import PostContent from '~/app/components/PostContent'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getDelphinePage } from '~/sanity/lib/sanity.queries'

export default async function DelphinePage() {
  const client = getClient({ token: readToken })

  const post = await getDelphinePage(client, {
    next: {
      revalidate: 1,
    },
  })

  return (
    <>
      <div className="md:h-screen md:w-full flex flex-col items-center justify-center bg-[#818895] text-white px-6 md:px-0 py-12">
        <PostContent post={post} />
      </div>
      <div className="relative  md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
        {/* // Mobile View */}
        <div className="h-full w-full md:hidden mb-20">
          <DelphineMobileScroll images={post.images} title={post.title} />
        </div>
        {/* Horizontal Scrolling Image Gallery on the Right */}
        <div className="hidden  overflow-hidden  md:block md:flex-grow md:pl-4 h-full">
          <DelphineScroll images={post.images} title={post.title} />
        </div>
      </div>
    </>
  )
}
