import Image from 'next/legacy/image'
import Link from 'next/link'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'
import HorizontalGallery from '../components/HorizontalGallery'
import { urlForImage } from '~/sanity/lib/sanity.image'

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

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  // Define dynamic layout sizes based on the selected layout
  const getDimensions = (layout: string) => {
    switch (layout) {
      case 'portrait':
        return { width: 300, height: 400, mobileHeight: 500, marginY: '10vh' } // Portrait dimensions
      case 'landscape':
        return { width: 370, height: 300, mobileHeight: 200, marginY: 'vh' } // Landscape dimensions
      case 'square':
        return { width: 300, height: 300, mobileHeight: 300, marginY: '12.5vh' } // Square dimensions
      default:
        return { width: 300, height: 300, mobileHeight: 400, marginY: '12vh' } // Default dimensions
    }
  }

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-neutral-900 w-full md:pt-16 font-barlow">
      {/* Render a list of posts */}
      <div className="gap-8">
        {posts.map((post) => {
          const dimensions = post.mainImages.map((image) => getDimensions(post.layout)) // Get dimensions based on layout

          return (
            <div key={post._id} className="md:mb-8">
              {/* Mobile View */}
              <HorizontalGallery mainImages={post.mainImages} layoutDimensions={dimensions} />

              {/* Desktop View */}
              <div className="relative w-full flex flex-col">
                <div className="hidden md:flex md:justify-center mb-12">
                  {/* Flex container to center images and maintain spacing */}
                  <div className="flex flex-row justify-center space-x-4">
                    {post.mainImages?.map((image: any, index: number) => (
                      <div className="relative" key={index}>
                        <Link href={`/post/${post.slug.current}`}>
                          <div
                            className="relative"
                            style={{
                              width: `${dimensions[index].width}px`,
                              height: `${dimensions[index].height}px`,
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
