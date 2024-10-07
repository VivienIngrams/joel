
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/app/components/Card'
import Container from '~/app/components/Container'
import Welcome from '~/app/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'




export default function IndexPage() {
 
  return (
    <Container>
      <section>
      <Image
          className="absolute top-0 left-0 right-0 bottom-0 min-h-screen bg-fixed bg-center bg-cover h-full w-full "
          src="/TERRE-6.jpg"
          width={1500}
          height={1000}
          alt="Sand"
        />
      </section>
    </Container>
  )
}