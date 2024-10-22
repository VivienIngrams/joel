import { formatDate } from "~/utils"

interface PostContentProps {
    post: {
      title?: string
      excerpt?: string
      body: any[]
      _createdAt: string
    }
  }
  
  function PostContent({ post }: PostContentProps) {
    return (
      <div className="w-full h-full md:fixed md:top-0 md:left-0 bg-neutral-900 md:bg-gradient-to-r from-black to-transparent py-16 md:pl-6 md:w-1/4 px-4 md:text-left z-50">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="leading-[18px] lg:leading-[20px] mt-4">
          {post.excerpt || 'No excerpt available.'}
        </p>
        {post.body && (
          <div className="mt-6">
            {post.body.map((block, index) => (
              <p key={index} className="text-base">
                {block.children?.map((child: any, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>
        )}
        <p className="mt-4 text-sm text-gray-500">
          {formatDate(post._createdAt)}
        </p>
      </div>
    )
  }

  export default PostContent