import ImageGallery from '~/app/components/ImageGallery';
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

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-neutral-900 w-screen md:pt-16 font-barlow">
      {/* Render ImageGallery for each post */}
      {posts.map((post) => (
        <ImageGallery key={post._id} mainImages={post.mainImages} layout={post.layout} slug={post.slug.current} title={post.title} />
      ))}
    </div>
  );
}
