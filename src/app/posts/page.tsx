import Image from 'next/legacy/image'
import Link from 'next/link'

import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'
import HorizontalGallery from '../components/HorizontalGallery'

// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken })

  // Fetch all posts with a defined revalidation time
  const posts: Post[] = await getPosts(client, {
    next: {
      revalidate: 1,
      cache: 'no-store',
    },
  })

  console.log(posts)
  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  // Define dynamic layout sizes based on the selected layout
  const getDimensions = (layout: string) => {
    switch (layout) {
      case 'portrait':
        return { width: 300, height: 400 } // Portrait dimensions
      case 'landscape':
        return { width: 370, height: 300 } // Landscape dimensions
      case 'square':
        return { width: 300, height: 300 } // Square dimensions
      default:
        return { width: 300, height: 300 } // Default dimensions
    }
  }

  return (
    <div className="md:min-h-[80vh] pb-20 bg-neutral-900 w-full pt-16 font-barlow">
      {/* Render a list of posts */}
      <div className="gap-8">
        {posts.map((post) => {
          const { width, height } = getDimensions(post.layout) // Get dimensions based on layout

          return (
            <div key={post._id} className="mb-8">
              {/* Post Container */}
              <div className="relative w-full flex flex-col">
                {/* Mobile View */}
            
                <HorizontalGallery mainImages={post.mainImages} />

                {/* Desktop View */}
                <div className="hidden md:flex md:justify-center mb-12">
                  {/* Flex container to center images and maintain spacing */}
                  <div className="flex flex-row justify-center space-x-4">
                    {post.mainImages?.map((image: any, index: number) => (
                      <div className="relative" key={index}>
                        <Link href={`/post/${post.slug.current}`}>
                          <div
                            className="relative"
                            style={{
                              width: `${width}px`,
                              height: `${height}px`,
                            }}
                          >
                            <Image
                              src={urlForImage(image).url() as string}
                              alt={image.alt || post.title}
                              layout="fill"
                              className="object-cover"
                              loading="lazy" // Ensure lazy loading
                            />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {/* Overlay for Title */}
                  <Link href={`/posts/${post.slug.current}`}>
                    <div className="opacity-0 absolute inset-0 hover:opacity-100 flex flex-col items-center justify-center bg-neutral-900 bg-opacity-50">
                      <h1 className="text-white uppercase text-4xl  lg:text-5xl text-center font-thin">
                        {post.title}
                      </h1>
                      <p className="text-white  text-center pt-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
