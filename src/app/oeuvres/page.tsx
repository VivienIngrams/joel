
import Image from 'next/image'

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

import Container from "../components/Container";

const client = getClient();

async function getProjectData() {
  const data = await client.fetch(
    `
      *[_type == 'post'=] {}
      `,
    {},
    {
      next: {
        revalidate: 10,
      },
    }
  );
  return data;
}


export default async function ProjectPage() {


  return (
    <div className="min-h-full">
      <Container>
      <div className="md:min-h-[60vh] w-full md:pt-8">
      {/* Mobile */}
      <div className="-mt-12 columns-1 sm:columns-2 md:hidden">
        {post.images?.map((image: any, index: number) => (
          <div key={index} className="mx-12 break-inside-avoid">
            
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:flex-row md:justify-center md:items-end  md:h-[60vh] w-full md:px-[10vw] ">
        {projectSection.images &&
          projectSection.images.map((image, index) => (
            <div className="relative h-[95%] w-full my-2 " key={index}>
              <Link
                href={isHomePage ? `/project/${slug}` : urlFor(image).url()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(image).url() as string}
                    alt=
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                    className="object-contain p-2"
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>

      {projectSection.text ? (
        isHomePage ? (
          <Link
            href={`/project/${slug}`}
            className="md:h-[15vh] flex flex-col items-center justify-center md:mb-32"
          >
            <div className="px-4 md:text-center md:max-w-[55vw]">
              <p className="leading-[18px] lg:leading-[20px] ">
                {projectSection.text[0]}
                <span className="text-2xl lg:text-4xl leading-[18px] lg:leading-[20px]  font-serif tracking-tighter">
                  {projectSection.text[1]}
                </span>
                {projectSection.text[2]}

                {projectSection.text[3]}

                {projectSection.text[4]}
              </p>
            </div>
          </Link>
        ) : (
          <div className="md:h-[30vh] flex flex-col items-center justify-center py-8">
            <div className="px-4 md:text-center md:max-w-[55vw]">
              <p className="leading-[18px] lg:leading-[20px] ">
                {projectSection.text[0]}
                <span className="text-2xl lg:text-4xl leading-[18px] lg:leading-[20px]  font-serif tracking-tighter">
                  {projectSection.text[1]}
                </span>
                {projectSection.text[2]}

                {projectSection.text[3]}

                {projectSection.text[4]}
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="md:h-24" />
      )}
    </div>
      </ Container >
    </div>
  );
}