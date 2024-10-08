
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { getPost, type Post,postSlugsQuery } from '~/sanity/lib/sanity.queries'
import { formatDate } from '~/utils'


// Fetch data on the server side
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // Get Sanity client
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, params.slug)

  // Handle case where post is not found
  if (!post) {
    return notFound()
  }

  return (
  
        <div className="md:min-h-[60vh] w-full md:pt-8">
          
          {/* Mobile */}
          <div className="-mt-12 columns-1 sm:columns-2 md:hidden">
            {post.mainImage && (
              <div className="mx-12 break-inside-avoid">
                <Image
                  src={urlForImage(post.mainImage).url() as string}
                  alt={post.title || 'Post Image'}
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:flex-row md:justify-center md:items-end md:h-[60vh] w-full md:px-[10vw]">
            {post.mainImage && (
              <div className="relative h-[95%] w-full my-2">
                <div className="relative w-full h-full">
                  <Image
                    src={urlForImage(post.mainImage).url() as string}
                    alt={post.title || 'Post Image'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="md:h-[30vh] flex flex-col items-center justify-center py-8">
            <div className="px-4 md:text-center md:max-w-[55vw]">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="leading-[18px] lg:leading-[20px] mt-4">
                {post.excerpt || 'No excerpt available.'}
              </p>
              {post.body && (
                <div className="mt-6">
                  {post.body.map((block, index) => (
                    <p key={index} className="text-base">
                      {/* Render text from PortableText blocks */}
                      {block.children?.map((child: any, childIndex: number) => (
                        <span key={childIndex}>{child.text}</span>
                      ))}
                    </p>
                  ))}
                </div>
              )}
              <p className="mt-4 text-sm text-gray-500">
                {formatDate(post._createdAt)}
              </p>
            </div>
          </div>
        </div>
      
  )
}

// Pre-render post slugs for static generation
export async function generateStaticParams() {
  const client = getClient({ token: readToken })
  const slugs: string[] = await client.fetch(postSlugsQuery)

  return slugs.map((slug) => ({
    slug,
  }))
}