import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { FaArrowDown } from "react-icons/fa6";


interface PostContentProps {
  post: {
    title?: string
    excerpt?: PortableTextBlock[]
  }
}

function PostContent({ post }: PostContentProps) {
  return (
    <>
      <div className="w-full md:fixed md:max-w-[30vw] min-[1800px]:max-w-[27vw] md:top-0 md:left-0 md:bg-gradient-to-r from-[#4b5563] via-[#4b5563]/90 to-transparent pt-12 pb-6 md:py-16 md:px-10 z-40">
        <div className="md:h-[90vh] flex flex-col justify-start md:justify-center">
          {/* Title */}
          <h1 className="text-3xl   md:text-4xl tracking-tighter font-light  md:mb-32">
            {post.title}
          </h1>

          {/* Excerpt Mobile*/}
          {post.excerpt && (
            <div className="md:hidden mt-3">
              <PortableText value={post.excerpt} />
            </div>
          )}
        </div>
      </div>
      {/* Excerpt Desktop*/}
      {post.excerpt && (
        <>
        <div className="mt-16 hidden md:block text-xl text-justify max-w-[450px] mb-8">
          <PortableText value={post.excerpt} />
        </div>
        <div className='hidden md:block h-12 mt-12'>
          <FaArrowDown  className="text-white text-[1.5rem]" />
        </div>
        </>
        
      )}
    </>
  )
}

export default PostContent
