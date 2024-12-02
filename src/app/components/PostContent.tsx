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
    <div className="w-full h-full md:fixed md:max-w-[25vw] min-[1800px]:max-w-[23vw] md:top-0 md:left-0 md:bg-gradient-to-r from-[#818895] via-[#818895]/90 to-transparent pt-16 pb-6 md:py-16 px-4 md:px-7 z-40">
     
      <div className='md:h-[80vh] flex flex-col justify-start md:justify-center'>
        {/* Title */}
        <h1 className="text-3xl font-barlow  md:text-4xl tracking-tighter font-light uppercase md:-mt-4">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && (
          <div className=" mt-3">
            <PortableText value={post.excerpt} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent
