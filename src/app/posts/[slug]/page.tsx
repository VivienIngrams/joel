import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post, postSlugsQuery } from '~/sanity/lib/sanity.queries'

import HorizontalGallery from '../../components/HorizontalGallery'


// Fetch data on the server side
export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, params.slug, {
    next: {
      revalidate: 1, // Revalidate every 10 seconds
      cache: 'no-store',
    },
  })

  
  return (
    <div className="md:min-h-[90vh] w-full md:pt-8 flex flex-row">
     
      {/* Horizontal Scrolling Image Gallery on the Right */}
      <HorizontalGallery mainImages={post.mainImages} />
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

import { formatDate } from '~/utils'

interface PostContentProps {
  post: {
    title?: string
    excerpt?: string
    body: any[]
    _createdAt: string
  }
}

 function PostContent({ post }: PostContentProps) {
  return (
    <div className="w-full h-full md:w-1/3 p-4 md:text-left">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="leading-[18px] lg:leading-[20px] mt-4">
        {post.excerpt || 'No excerpt available.'}
      </p>
      {post.body && (
        <div className="mt-6">
          {post.body.map((block, index) => (
            <p key={index} className="text-base">
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
  )
}
