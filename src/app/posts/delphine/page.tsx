import { DelphineMobileScroll, DelphineScroll } from '~/app/components/DelphineScroll'
import PostContent from '~/app/components/PostContent'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getDelphinePage } from '~/sanity/lib/sanity.queries'

export default async function DelphinePage() {
  const client = getClient({ token: readToken })

  const post = await getDelphinePage(client, {
    next: {
      revalidate: 5,
      
    },
  })
 
  return (
    <div className="min-h-[80vh] md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
    {/* Post Content on the Left */}
    <PostContent post={post} />
    {/* // Mobile View */}
    <DelphineMobileScroll images={post.images} title={post.title}/>
    
    {/* Horizontal Scrolling Image Gallery on the Right */}
    <div className="hidden md:block md:flex-grow md:pl-4 h-full">
      <DelphineScroll images={post.images} title={post.title}/>
    </div>
  </div>
  )
}
