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
    <div className="h-full md:min-h-[80vh] pb-20 font-cinzel bg-white max-w-[98vw] pt-20 md:pt-16 ">
      {/* Top Menu with Post Titles */}
      <nav className="fixed bg-gradient-to-t  from-transparent via-white to-white text-gray-500 md:py-6 px-4 top-12 w-full z-10">
        <ul className="flex flex-row flex-wrap pt-10 pb-16 md:py-6 gap-x-7 justify-center">
          {posts.map((post, index) => (
            <li key={index}>
              <Link
                href={`/posts/${post.slug.current}`}
                className="hover:text-black font-medium leading-2 text-sm  md:text-xl"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Render ImageGallery for each post */}
      {posts.map((post) => (
        <div key={post._id}>
          {/* Show on mobile screens */}
          <div className="py-8 md:hidden">
            <MobileImageGallery
              images={post.mainImages}
              layout={post.layout}
              slug={post.slug.current}
              title={post.title}
            />
          </div>
          
          {/* Show on desktop screens */}
          <div className="hidden md:block">
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
