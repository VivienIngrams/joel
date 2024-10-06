
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
        
      </section>
    </Container>
  )
}