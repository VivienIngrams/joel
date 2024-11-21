import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import Link from 'next/link'


interface PostContentProps {
  post: {
    title?: string
    excerpt?: PortableTextBlock[]
  }
}

function PostContent({ post }: PostContentProps) {
  return (
    <div className="w-full h-full md:fixed md:max-w-[22vw] md:top-0 md:left-0 md:bg-gradient-to-r from-black via-black/90 to-transparent pt-16 pb-6 md:py-16 px-4 md:px-7  md:text-left z-40">
     
      <div className='h-[80vh] flex flex-col justify-center '>
        {/* Title */}
        <h1 className="text-2xl font-bold mt-10">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && (
          <div className=" mt-4">
            <PortableText value={post.excerpt} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent
