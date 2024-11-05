import Image from 'next/legacy/image'
import Link from 'next/link'

import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'

// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken })

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

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-neutral-900 w-full md:pt-16 font-barlow">
      {/* Render a list of posts */}
      <div className="gap-8 ">
        {posts.map((post) => (
          <div key={post._id} className="md:mb-8">
{/*            
            <div className="block md:hidden">
              <div className='h-24 w-full'/>
              <ImageGallery mainImages={post.mainImages} layout={post.layout} />
            </div> */}
            
            {/* Larger Screens */}
            <div className=" relative w-full md:flex flex-col">
              <div className="flex justify-center mb-12">
                {/* Flex container to center images and maintain spacing */}
                <div className="flex flex-row justify-center space-x-4">
                  {post.mainImages?.map((image: any, index: number) => (
                    <div className="relative" key={index}>
                      <Link href={`/post/${post.slug.current}`}>
                        <div
                          className="relative"
                          style={{
                            width: '300px', // Static width for larger screens, can be adjusted as needed
                            height: '300px', // Static height for larger screens, can be adjusted as needed
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
                    <h1 className="text-white uppercase text-4xl lg:text-5xl text-center font-thin">
                      {post.title}
                    </h1>
                    <p className="text-white text-center pt-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
