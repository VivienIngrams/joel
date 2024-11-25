import MobileImageGallery from '~/app/components/MobileImageGallery'
import ImageGallery from '~/app/components/ImageGallery'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post } from '~/sanity/lib/sanity.queries'

export default async function PublieesPage() {
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, 'publiees', {
    next: {
      revalidate: 10, // Revalidate every second
      cache: 'no-store',
    },
  })

  // Handle case where no post is found
  if (!post) {
    return <p>No post found.</p>
  }

  return (
    <div className="min-h-[80vh] md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
     
       
    {/* Render ImageGallery for each post */}
    {/* {posts.map((post) => (
        <div key={post._id}> */}
          {/* Show on mobile screens */}
          {/* <div className="py-8 md:hidden">
            <MobileImageGallery 
              images={post.mainImages} 
              layout={post.layout} 
              slug={post.slug.current} 
              title={post.title} 
            />
          </div> */}
          {/* Show on desktop screens */}
          {/* <div className="hidden md:block">
            <ImageGallery 
              images={post.mainImages} 
              layout={post.layout} 
              slug={post.slug.current} 
              title={post.title} 
            />
          </div>
        </div> */}
      {/* ))}  */}
    </div>
  )
}
