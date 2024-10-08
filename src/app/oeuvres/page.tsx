import Image from 'next/image';
import Link from 'next/link';

import { readToken } from '~/sanity/lib/sanity.api';
import { getClient } from '~/sanity/lib/sanity.client';
import { urlForImage } from '~/sanity/lib/sanity.image';
import { getPosts, type Post } from '~/sanity/lib/sanity.queries';
import { formatDate } from '~/utils';

// Fetch data on the server side for all posts
export default async function PostsPage() {
  // Get Sanity client
  const client = getClient({ token: readToken });

  // Fetch all posts with revalidation
  const posts: Post[] = await getPosts(client, {
    cache: 'no-cache',
    next: {
      revalidate: 10, // Revalidate every 10 seconds
    },
  });
  console.log(posts[0])

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="md:min-h-[60vh] bg-black w-full md:pt-8">
      {/* Render a list of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="mb-8">
            {/* Render an array of main images */}
            <div className="md:min-h-[60vh] w-full">
              {/* Mobile View */}
              <div className="-mt-12 columns-1 sm:columns-2 md:hidden">
                {post.mainImages?.map((image: any, index: number) => (
                  <div key={index} className="mx-12 break-inside-avoid">
                    <Link href={`/post/${post.slug.current}`}>
                      <Image
                        src={urlForImage(image).url() as string}
                        alt="Gallery Image"
                        width={500}
                        height={500}
                        className="mt-12 w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex md:flex-row md:justify-center md:items-end md:h-[60vh] w-full md:px-[10vw]">
                {post.mainImages?.map((image: any, index: number) => (
                  <div className="relative h-[95%] w-full my-2" key={index}>
                    <Link href={`/post/${post.slug.current}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={urlForImage(image).url() as string}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                          className="object-contain p-2"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Post Title */}
              <h2 className="text-2xl font-bold mt-4">{post.title}</h2>

              {/* Post Excerpt */}
              <p className="text-gray-700 mt-2">
                {post.excerpt || 'No excerpt available.'}
              </p>

              {/* Post Date */}
              <p className="mt-4 text-sm text-gray-500">
                {formatDate(post._createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
