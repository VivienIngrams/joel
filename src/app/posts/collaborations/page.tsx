import Link
 from 'next/link';

import ImageGallery from '~/app/components/ImageGallery';
import MobileImageGallery from '~/app/components/MobileImageGallery';
import { readToken } from '~/sanity/lib/sanity.api';
import { getClient } from '~/sanity/lib/sanity.client';
import { getCollaborationsPosts, type Post } from '~/sanity/lib/sanity.queries';
// Fetch data on the server side for all posts
export default async function CollaborationsPage() {
  const client = getClient({ token: readToken });

  const posts: Post[] = await getCollaborationsPosts(client, {
    next: {
      revalidate: 10,
  
          },
  });

  
  // Define custom slug order
  const customOrder = [
    'vibrations',
    'mathilde',
    'johanna'
  ]

  // Sort posts succinctly
  const sortedPosts = posts.sort(
    (a, b) =>
      customOrder.indexOf(a.slug.current) -
        customOrder.indexOf(b.slug.current) ||
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
  )

  if (!sortedPosts || sortedPosts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-white font-cinzel max-w-[98vw] pt-32 md:pt-16 ">
       
      {/* Render ImageGallery for each post */}


      {posts.map((post, index) => (
        <div key={index}>
          {/* Show on mobile screens */}
          <div className="pb-6 md:hidden">
            <MobileImageGallery 
              images={post.mainImages} 
              layout={post.layout} 
              slug={post.slug.current} 
              title={post.title} 
            />
          </div>
          {/* Show on desktop screens */}
          <div className="hidden md:block">
            <ImageGallery 
              images={post.mainImages} 
              layout={post.layout} 
              slug={post.slug.current} 
              title={post.title} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
