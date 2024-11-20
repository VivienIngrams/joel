import HorizontalScroll from '~/app/components/HorizontalScroll'
import MobileScroll from '~/app/components/MobileImageGallery'
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
      revalidate: 5, // Revalidate every second
      cache: 'no-store',
    },
  })

  // Handle case where no post is found
  if (!post) {
    return <p>No post found.</p>
  }
console.log(post.images[0])
  return (
    <div className="min-h-[80vh] md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
      {/* Post Content on the Left */}
      <PostContent post={post} />
      {/* // Mobile View */}
      {/* <div className="h-full w-full md:hidden mb-20">
        <MobileScroll
          images={post.images}
          layout={post.layout}
          slug={post.slug.current}
          title={post.title}

        />
      </div> */}
      {/* Horizontal Scrolling Image Gallery on the Right */}
      <div className="hidden md:block md:flex-grow md:pl-4 h-full">
        <HorizontalScroll images={post.images}   />
      </div>
    </div>
  )
}
