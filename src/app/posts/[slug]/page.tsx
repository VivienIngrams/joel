import { notFound } from 'next/navigation'

import HorizontalScroll from '~/app/components/HorizontalScroll'
import MobileScroll from '~/app/components/MobileScroll'
import PostContent from '~/app/components/PostContent'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post } from '~/sanity/lib/sanity.queries'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, params.slug, {
    next: {
      revalidate: 1,
      cache: 'no-store',
    },
  })

  console.log(post)
  // Handle case where no post is found
  if (!post) {
    return <p>No post found.</p>
  }

  return (
    <>
      <div className="md:h-screen w-screen flex flex-col items-center justify-center bg-[#818895] text-white px-6 py-12">
        <PostContent post={post} />
      </div>
      <div className="relative  md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
        {/* // Mobile View */}
        <div className="h-full w-full md:hidden mb-20">
          <MobileScroll images={post.images} title={post.title} />
        </div>
        {/* Horizontal Scrolling Image Gallery on the Right */}
        <div className="hidden overflow-hidden md:block md:flex-grow md:pl-4 h-full">
          <HorizontalScroll images={post.images} title={post.title} />
        </div>
      </div>
    </>
  )
}
