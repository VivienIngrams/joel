import Link from 'next/link'

import ImageGallery from '~/app/components/ImageGallery'
import MobileImageGallery from '~/app/components/MobileImageGallery'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getProjetsPosts, type Post } from '~/sanity/lib/sanity.queries'

// Fetch data on the server side for all posts
export default async function ProjetsPage() {
  const client = getClient({ token: readToken })

  const posts: Post[] = await getProjetsPosts(client, {
    next: {
      revalidate: 100,
    },
  })

  return (
    <div className="h-full xl:min-h-[80vh] pb-20 font-cinzel bg-white max-w-[98vw] pt-20 xl:pt-16 ">
     
      {/* Render ImageGallery for each post */}
      {posts.map((post) => (
        <div key={post._id}>
          {/* Show on mobile screens */}
          <div className="py-8 xl:hidden">
            <MobileImageGallery
              images={post.mainImages}
              layout={post.layout}
              slug={post.slug.current}
              title={post.title}
            />
          </div>
          
          {/* Show on desktop screens */}
          <div className="hidden xl:block">
            <ImageGallery
              images={post.mainImages}
              layout={post.layout}
              slug={post.slug.current}
              title={post.title}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
