import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="">
      {post.mainImage ? (
        <Image
          className=""
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="" />
      )}
      <div className="">
        <h3 className="">
          <a className="" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="">{post.excerpt}</p>
        <p className="">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}
