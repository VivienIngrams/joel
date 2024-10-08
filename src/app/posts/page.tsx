import Image from 'next/image'
import Link from 'next/link'

import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'

// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken });

  // Fetch all posts with a defined revalidation time
  const posts: Post[] = await getPosts(client, {
    next: {
      revalidate: 10, // Revalidate every 10 seconds
    },
  });
  console.log('Fetched Posts:', posts); 

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <div className="md:min-h-[90vh] bg-black w-full md:pt-32">
      {/* Render a list of posts */}
      <div className="gap-8">
        {posts.map((post) => (
          <div key={post._id} className="mb-8">
            {/* Post Container */}
            <div className="md:min-h-[80vh] w-full">
              {/* Title above the images */}
              <div className="flex justify-center">
            
                {/* Add margin bottom here */}
                <h1 className=" text-white">
                  {post.title}
                </h1>{' '}
                {/* Added styling for visibility */}
              </div>

              {/* Mobile View */}
              <div className="columns-1 sm:columns-2 md:hidden">
                {post.mainImages?.map((image: any, index: number) => (
                  <div key={index} className="mx-12 break-inside-avoid">
                    <Link href={`/post/${post.slug.current}`}>
                      <Image
                        src={urlForImage(image).url() as string}
                        alt="Gallery Image"
                        width={500}
                        height={500}
                        className="mt-12 w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex md:flex-row md:justify-center md:items-start md:h-[60vh] w-full md:px-[10vw]">
                {post.mainImages?.map((image: any, index: number) => (
                  <div className="relative h-full w-full" key={index}>
                    <Link href={`/post/${post.slug.current}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={urlForImage(image).url() as string}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Post Excerpt */}
              <p className="text-gray-700 mt-2">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
