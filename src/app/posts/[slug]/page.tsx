import HorizontalGallery from '~/app/components/HorizontalGallery'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post, postSlugsQuery } from '~/sanity/lib/sanity.queries'
import PostContent from '~/app/components/PostContent'

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

  // Handle case where no post is found
  if (!post) {
    return <p>No post found.</p>
  }

// Define dynamic layout sizes based on the selected layout
const getDimensions = (layout: string) => {
  // Fallback for server-side rendering, use default values if window is not defined
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800; // Default to 800 if window is not available
  
  switch (layout) {
    case 'portrait':
      return {
        width: screenHeight * 0.75, // 3:4 aspect ratio
        height: screenHeight,
        mobileHeight: screenHeight * 1.25, // 5:4 ratio for mobile
        marginY: '10vh',
      };
    case 'landscape':
      return {
        width: screenHeight * 1.6, // 16:10 aspect ratio
        height: screenHeight,
        mobileHeight: screenHeight * 0.5, // 16:5 ratio for mobile
        marginY: '10vh',
      };
    case 'square':
      return {
        width: screenHeight, // 1:1 aspect ratio
        height: screenHeight,
        mobileHeight: screenHeight,
        marginY: '12.5vh',
      };
    default:
      return {
        width: screenHeight * 1.5, // 3:2 aspect ratio for default
        height: screenHeight,
        mobileHeight: screenHeight * 1.1, // Slightly taller for mobile
        marginY: '12vh',
      };
  }
};

  // Generate dimensions for each image
  const dimensions = post.mainImages.map(() => getDimensions(post.layout))

  return (
    <div className="h-full w-screen md:flex md:flex-row">
      <PostContent post={post} />
      {/* Horizontal Scrolling Image Gallery on the Right */}
      <HorizontalGallery mainImages={post.mainImages} layoutDimensions={dimensions} />
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


