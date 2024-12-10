import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'


interface PostContentProps {
  post: {
    title?: string
    excerpt?: PortableTextBlock[]
  }
}

function PostContent({ post }: PostContentProps) {
  return (
    <div className="w-full h-full relative md:fixed md:max-w-[25vw] min-[1800px]:max-w-[23vw] md:top-0 md:left-0 md:bg-[#4b5563] pt-16 pb-6 md:py-16 px-4 md:pl-7 z-40">
      {/* Gradient Space */}
      <div className="hidden md:block absolute top-0 left-[25vw] min-[1800px]:left-[23vw] md:w-[5vw] bg-gradient-to-r from-[#4b5563] via-[#4b5563]/70  to-transparent h-full"></div>{' '}
      <div className="md:h-[80vh] flex flex-col justify-start md:justify-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl tracking-tighter font-light  md:-mt-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="mt-3">
            <PortableText value={post.excerpt} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent
