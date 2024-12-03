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
    <>
      <div className="w-full h-full md:fixed md:max-w-[30vw] min-[1800px]:max-w-[27vw] md:top-0 md:left-0 md:bg-gradient-to-r from-[#818895] via-[#818895]/90 to-transparent pt-16 pb-6 md:py-16 px-4 md:px-7 z-40">
        <div className="md:h-[80vh] flex flex-col justify-start md:justify-center">
          {/* Title */}
          <h1 className="text-3xl font-barlow  md:text-4xl tracking-tighter font-light uppercase ">
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
        <div className=" hidden md:block text-xl text-justify max-w-2xl mb-8">
          <PortableText value={post.excerpt} />
        </div>
      )}
    </>
  )
}

export default PostContent
