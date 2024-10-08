import Image from 'next/image';
import { useLiveQuery } from 'next-sanity/preview'; // Ensure you're using this if you're in draft mode

import { getClient } from '~/sanity/lib/sanity.client';
import { getHomePage } from '~/sanity/lib/sanity.queries';

export default async function HomePage() {
  // Get the Sanity client
  const client = getClient();
  
  // Fetch the home page data
  const homePageData = await getHomePage(client);

  return (
    <section className="relative h-screen w-full">
      {/* Use the fetched image data */}
      {homePageData?.image?.asset?.url && (
        <Image
          className="object-cover"
          src={homePageData.image.asset.url}
          fill
          sizes="100vw"
          alt="Home Page Background"
        />
      )}
    </section>
  );
}


// import '~/styles/global.css'

// import type { AppProps } from 'next/app'
// import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
// import { lazy } from 'react'

// export interface SharedPageProps {
//   draftMode: boolean
//   token: string
// }

// const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

// const mono = IBM_Plex_Mono({
//   variable: '--font-family-mono',
//   subsets: ['latin'],
//   weight: ['500', '700'],
// })

// export default function App({
//   Component,
//   pageProps,
// }: AppProps<SharedPageProps>) {
//   const { draftMode, token } = pageProps
//   return (
//     <>
//       <style jsx global>
//         {`
//           :root {
//
//             --font-family-mono: ${mono.style.fontFamily};
//           }
//         `}
//       </style>
//       {draftMode ? (
//         <PreviewProvider token={token}>
//           <Component {...pageProps} />
//         </PreviewProvider>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </>
//   )
// }
// import type { GetStaticProps, InferGetStaticPropsType } from 'next'
// import { useLiveQuery } from 'next-sanity/preview'

// import Card from '~/components/Card'
// import Container from '~/components/Container'
// import Welcome from '~/components/Welcome'
// import { readToken } from '~/sanity/lib/sanity.api'
// import { getClient } from '~/sanity/lib/sanity.client'
// import { getPosts, type Post, postsQuery } from '~/sanity/lib/sanity.queries'
// import type { SharedPageProps } from '~/pages/_app'

// export const getStaticProps: GetStaticProps<
//   SharedPageProps & {
//     posts: Post[]
//   }
// > = async ({ draftMode = false }) => {
//   const client = getClient(draftMode ? { token: readToken } : undefined)
//   const posts = await getPosts(client)

//   return {
//     props: {
//       draftMode,
//       token: draftMode ? readToken : '',
//       posts,
//     },
//   }
// }

// export default function IndexPage(
//   props: InferGetStaticPropsType<typeof getStaticProps>,
// ) {
//   const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
//   return (
//     <Container>
//       <section>
//         {posts.length ? (
//           posts.map((post) => <Card key={post._id} post={post} />)
//         ) : (
//           <Welcome />
//         )}
//       </section>
//     </Container>
//   )
// }
