import Image from 'next/image';
import Link from 'next/link';

import { readToken } from '~/sanity/lib/sanity.api';
import { getClient } from '~/sanity/lib/sanity.client';
import { urlForImage } from '~/sanity/lib/sanity.image';
import { getPosts, type Post } from '~/sanity/lib/sanity.queries';

// Fetch data on the server side for all posts
export default async function PostsPage() {
  const client = getClient({ token: readToken });

  // Fetch all posts with a defined revalidation time
  const posts: Post[] = await getPosts(client, {
    next: {
      revalidate: 10, // Revalidate every 10 seconds
    },
  });

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  // Define dynamic layout sizes based on the selected layout
  const getDimensions = (layout: string) => {
    switch (layout) {
      case 'portrait':
        return { width: 300, height: 400 }; // Portrait dimensions
      case 'landscape':
        return { width: 400, height: 300 }; // Landscape dimensions
      case 'square':
        return { width: 300, height: 300 }; // Square dimensions
      default:
        return { width: 300, height: 300 }; // Default dimensions
    }
  };

  return (
    <div className="md:min-h-[80vh] bg-black w-full md:pt-32">
      {/* Render a list of posts */}
      <div className="gap-8">
        {posts.map((post) => (
          <div key={post._id} className="mb-8">
            {/* Post Container */}
            <div className="relative w-full flex flex-col">
              {/* Mobile View */}
              <div className="columns-1 sm:columns-2 md:hidden">
                {post.mainImages?.map((image: any, index: number) => {
                  const { width, height } = getDimensions(image.layout); // Get dimensions dynamically

                  return (
                    <div key={index} className="mx-12 break-inside-avoid">
                      <Link href={`/post/${post.slug.current}`}>
                        <Image
                          src={urlForImage(image).url() as string}
                          alt={image.alt || 'Gallery Image'}
                          width={width}
                          height={height}
                          className="mt-12 w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex md:justify-center mb-12">
                {/* Flex container to center images and maintain spacing */}
                <div className="flex flex-row justify-center space-x-4">
                  {post.mainImages?.map((image: any, index: number) => {
                    const { width, height } = getDimensions(image.layout); // Get dimensions dynamically

                    return (
                      <div className="relative" key={index}>
                        <Link href={`/post/${post.slug.current}`}>
                          <div
                            className="relative"
                            style={{
                              width: `${width}px`,
                              height: `${height}px`,
                            }}
                          >
                            <Image
                              src={urlForImage(image).url() as string}
                              alt={image.alt || post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Overlay for Title */}
                <div className="opacity-0 absolute inset-0 hover:opacity-100 flex items-center justify-center bg-black bg-opacity-50">
                  <h1 className="text-white uppercase text-4xl md:text-6xl lg:text-7xl text-center font-thin">
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
