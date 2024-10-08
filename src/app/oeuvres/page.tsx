
import Image from 'next/image'

import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { getPosts, type Post } from '~/sanity/lib/sanity.queries'
import { formatDate } from '~/utils'

import Container from "../components/Container"

// Fetch data on the server side for all posts
export default async function PostsPage() {
  // Get Sanity client
  const client = getClient({ token: readToken })

  // Fetch all posts
  const posts: Post[] = await getPosts(client)

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
   
        <div className="md:min-h-[60vh] bg-black w-full md:pt-8">
          
          {/* Render a list of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <div key={post._id} className="mb-8">
                {post.mainImage && (
                  <div className="relative w-full h-64 mb-4">
                    <Image
                      src={urlForImage(post.mainImage).url() as string}
                      alt={post.title || 'Post Image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Post Title */}
                <h2 className="text-2xl font-bold">{post.title}</h2>

                {/* Post Excerpt */}
                <p className="text-gray-700 mt-2">
                  {post.excerpt || 'No excerpt available.'}
                </p>

                {/* Post Date */}
                <p className="mt-4 text-sm text-gray-500">
                  {formatDate(post._createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      
  )
}
