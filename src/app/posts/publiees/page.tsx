import ImageGallery from '~/app/components/ImageGallery';
import MobileImageGallery from '~/app/components/MobileImageGallery';
import { readToken } from '~/sanity/lib/sanity.api';
import { getClient } from '~/sanity/lib/sanity.client';
import { getPublieesPosts, type Post } from '~/sanity/lib/sanity.queries';

// Fetch data on the server side for all posts
export default async function PublieesPage() {
  const client = getClient({ token: readToken });

  const posts: Post[] = await getPublieesPosts(client, {
    next: {
      revalidate: 30,
  
          },
  });

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-[#4b5563] max-w-[98vw] pt-16 ">
      {/* Render ImageGallery for each post */}
      <h1 className="text-3xl md:text-5xl  font-light  uppercase ml-4 md:ml-20 md:mb-12">Séries publiées</h1>

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
