import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/app/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import { formatDate } from '~/utils'



export default function ProjectSlugRoute(
) {
 

  return (
    <Container>
      <section className="post">
        <div>Posts</div>
        
      </section>
    </Container>
  )
}
