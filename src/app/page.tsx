
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
        <Image  className="logos__entry" src="/TERRE-2.jpg" alt="" width="500" height="500"/>
      </section>
    </Container>
  )
}