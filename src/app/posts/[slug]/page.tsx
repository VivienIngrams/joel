import HorizontalScroll from '~/app/components/HorizontalScroll'
import PostContent from '~/app/components/PostContent'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post } from '~/sanity/lib/sanity.queries'
import MobileScroll from '~/app/components/MobileImageGallery'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, params.slug, {
    next: {
      revalidate: 1, // Revalidate every second
      cache: 'no-store',
    },
  })

  // Handle case where no post is found
  if (!post) {
    return <p>No post found.</p>
  }

  return (
    <div className="h-full w-screen md:flex">
      {/* Post Content on the Left */}
      <PostContent post={post} />
      {/* // Mobile View */}
      <div className="h-full w-full md:hidden">
        <MobileScroll
          mainImages={post.mainImages}
          layout={post.layout}
          slug={post.slug.current}
          title={post.title}
        />
      </div>
      {/* Horizontal Scrolling Image Gallery on the Right */}
      <div className="hidden md:block md:flex-grow md:pl-4 h-full">
        <HorizontalScroll mainImages={post.mainImages} layout={post.layout} />
      </div>
    </div>
  )
}
