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
    <div className="w-full h-full md:fixed md:max-w-[22vw] min-[1800px]:max-w-[20vw] md:top-0 md:left-0 md:bg-gradient-to-r from-[#091129] via-[#091129]/90 to-transparent pt-16 pb-6 md:py-16 px-4 md:px-7 z-40">
     
      <div className='md:h-[80vh] flex flex-col justify-start md:justify-center'>
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-light font-barlow uppercase md:-mt-4">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && (
          <div className=" mt-2">
            <PortableText value={post.excerpt} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent
