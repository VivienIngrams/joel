import { notFound } from 'next/navigation'

import HorizontalScroll from '~/app/components/HorizontalScroll'
import MobileScroll from '~/app/components/MobileScroll'
import PostContent from '~/app/components/PostContent'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getPost, type Post } from '~/sanity/lib/sanity.queries'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient({ token: readToken })

  // Fetch the post by slug
  const post: Post | null = await getPost(client, params.slug, {
    next: {
      revalidate: 10,
    },
  })
console.log(post.subtitles)
  // Handle case where no post is found
  if (!post) {
    return <p>No post found.</p>
  }

  return (
    <div className="min-h-[80vh] md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
      {/* Right arrow in corner */}
      <div className="hidden md:flex absolute bottom-[15%] left-[31%] h-16 w-20 flex-col items-center justify-center z-40">
        <div className="pb-2 text-white text-2xl">scroll</div>
        <svg
          fill="#ffffff"
          height="50px"
          width="50px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 511.881 511.881"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <g>
                {' '}
                <g>
                  {' '}
                  <path d="M248.36,263.428c4.16,4.16,10.88,4.16,15.04,0L508.733,18.095c4.053-4.267,3.947-10.987-0.213-15.04 c-4.16-3.947-10.667-3.947-14.827,0l-237.76,237.76L18.173,3.054C13.907-1.106,7.187-0.999,3.027,3.268 c-3.947,4.16-3.947,10.667,0,14.827L248.36,263.428z"></path>{' '}
                  <path d="M508.627,248.388c-4.267-4.053-10.773-4.053-14.933,0l-237.76,237.76l-237.76-237.76 c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l245.333,245.333c4.16,4.16,10.88,4.16,15.04,0 L508.84,263.428C512.893,259.161,512.787,252.441,508.627,248.388z"></path>{' '}
                </g>{' '}
              </g>{' '}
            </g>{' '}
          </g>
        </svg>
      </div>
      {/* Post Content on the Left */}
      <PostContent post={post} />
      {/* // Mobile View */}
      <div className="h-full w-full md:hidden mb-20">
        <MobileScroll images={post.images} title={post.title} />
      </div>
      {/* Horizontal Scrolling Image Gallery on the Right */}
      <div className="hidden md:block md:flex-grow md:pl-4 h-full">
        <HorizontalScroll images={post.images} title={post.title} subtitles={post.subtitles}/>
      </div>
    </div>
  )
}
