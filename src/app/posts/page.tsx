
import ImageGallery from '~/app/components/ImageGallery'
import MobileImageGallery from '~/app/components/MobileImageGallery'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'



// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken })

  const posts: Post[] = await getPosts(client, {
    next: {
      revalidate: 2
    },
  })
 
  
  // Define custom slug order
  const customOrder = [
    'autoportraits',
    'survol',
    'hors-d-age',
    'respiration',
    'derision',
    'collaborations',
    'projets',
    'images-du-jour',
  ]

  // Sort posts succinctly
  const sortedPosts = posts.sort(
    (a, b) =>
      customOrder.indexOf(a.slug.current) -
        customOrder.indexOf(b.slug.current) ||
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
  )

  if (!sortedPosts || sortedPosts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <div className="h-full xl:min-h-[80vh] pb-20 font-cinzel font-bold bg-white max-w-full pt-40 xl:pt-16 ">

      {/* Render ImageGallery for each post */}
      {sortedPosts.map((post) => (
        <div key={post._id} className=" ">
          {/* Show on mobile screens */}
          <div className=" pb-6 xl:hidden">
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
