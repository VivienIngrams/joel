import Image from 'next/image'
import Link from 'next/link'

import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'

// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken })

  // Fetch all posts with a defined revalidation time
  const posts: Post[] = await getPosts(client, {
    next: {
      revalidate: 10, // Revalidate every 10 seconds
    },
  })
  console.log('Fetched Posts:', posts)

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <div className="md:min-h-[80vh] bg-black w-full md:pt-16">
      {/* Render a list of posts */}
      <div className="gap-8">
        {posts.map((post) => (
          <div key={post._id} className="mb-8">
            {/* Post Container */}
            <div className="relative w-full flex flex-col">
              {/* Mobile View */}
              <div className="columns-1 sm:columns-2 md:hidden">
                {post.mainImages?.map((image: any, index: number) => (
                  <div key={index} className="mx-12 break-inside-avoid">
                    <Link href={`/post/${post.slug.current}`}>
                      <Image
                        src={urlForImage(image).url() as string}
                        alt="Gallery Image"
                        width={500}
                        height={500} // Ensure width and height are set
                        className="mt-12 w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex md:justify-center mb-12">
                {/* Flex container to center images and maintain spacing */}
                <div className="flex flex-row justify-center space-x-4">
                  {post.mainImages?.map((image: any, index: number) => (
                    <div className="relative w-full" key={index}>
                      <Link href={`/post/${post.slug.current}`}>
                        <div className="relative w-[300px] h-[300px]">
                          {' '}
                          {/* Set a height and width for each image */}
                          <Image
                            src={urlForImage(image).url() as string}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Overlay for Title */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center bg-black bg-opacity-50">
                  <h1 className="text-white uppercase text-4xl md:text-6xl lg:text-7xl text-center font-thin">
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
