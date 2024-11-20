import ImageGallery from '~/app/components/ImageGallery';
import MobileImageGallery from '~/app/components/MobileImageGallery';
import { readToken } from '~/sanity/lib/sanity.api';
import { getClient } from '~/sanity/lib/sanity.client';
import { getPosts, type Post } from '~/sanity/lib/sanity.queries';

// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken });

  const posts: Post[] = await getPosts(client, {
    next: {
      revalidate: 2,
      cache: 'no-store',
    },
  });
console.log(posts)
  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-neutral-800 w-screen pt-16 font-barlow">
      {/* Render ImageGallery for each post */}
      {posts.map((post) => (
        <div key={post._id}>
          {/* Show on mobile screens */}
          <div className="py-8 md:hidden">
            <MobileImageGallery 
              mainImages={post.mainImages} 
              layout={post.layout} 
              slug={post.slug.current} 
              title={post.title} 
            />
          </div>
          {/* Show on desktop screens */}
          <div className="hidden md:block">
            <ImageGallery 
              mainImages={post.mainImages} 
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
