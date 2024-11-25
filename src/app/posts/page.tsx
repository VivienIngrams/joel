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
      revalidate: 1,
      cache: 'no-store',
    },
  });

  // Define custom slug order
  const customOrder = [
    "survol",
    "hors-d-age",
    "autoportraits",
    "moi-vu-par-elles-eux",
    "derision",
    "publiees",
    "projets",
  ];
 
  // Sort posts succinctly
  const sortedPosts = posts.sort((a, b) => 
    customOrder.indexOf(a.slug.current) - customOrder.indexOf(b.slug.current) ||
    new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );

  if (!sortedPosts || sortedPosts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-[#091129] w-screen pt-16 font-barlow">
      {/* Render ImageGallery for each post */}
      {posts.map((post) => (
        <div key={post._id}>
          {/* Show on mobile screens */}
          <div className="py-8 md:hidden">
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
