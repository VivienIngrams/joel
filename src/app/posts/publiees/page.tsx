import Link
 from 'next/link';

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
      revalidate: 300,
  
          },
  });

  return (
    <div className="h-full md:min-h-[80vh] pb-20 bg-[#545964] max-w-[98vw] pt-16 ">
      {/* Top Menu with Post Titles */}
      <nav className=" text-white pt-4 px-4 top-0 z-60 ">
        <ul className="flex flex-col md:flex-row md:flex-wrap gap-x-7 justify-center ">
          {posts.map((post, index) => (
            <li key={index}>
              <Link href={`/posts/${post.slug.current}`}
                className="hover:underline leading-4  md:text-xl ">
                  {post.title}
               
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Render ImageGallery for each post */}


      {posts.map((post, index) => (
        <div key={index}>
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
