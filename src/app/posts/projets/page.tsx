import ImageGallery from '~/app/components/ImageGallery'
import MobileImageGallery from '~/app/components/MobileImageGallery'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post } from '~/sanity/lib/sanity.queries'

export default async function ProjetsPage() {
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, 'projets', {
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
     </div>
  )}