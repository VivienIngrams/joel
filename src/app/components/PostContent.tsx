import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';  // Correct import

interface PostContentProps {
  post: {
    title?: string;
    excerpt?: PortableTextBlock[];  // Ensure this is the correct type
  };
}

function PostContent({ post }: PostContentProps) {
  return (
    <div className="w-full h-full md:fixed md:max-w-[20vw] md:top-0 md:left-0 md:bg-gradient-to-r from-black to-transparent pt-16 pb-6 md:py-24 px-4 md:px-7  md:text-left z-40">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      
      {post.excerpt && (
        <div className="leading-[18px] lg:leading-[20px] mt-4">
          <PortableText value={post.excerpt} />
        </div>
      )}
    </div>
  );
}

export default PostContent;
