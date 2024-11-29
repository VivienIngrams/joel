import Image from 'next/legacy/image';
import Link from 'next/link';

import Verification from '~/app/components/Verification';
import { getClient } from '~/sanity/lib/sanity.client';
import { getHomePage } from '~/sanity/lib/sanity.queries';

import Slider from './components/Slider';

export default async function HomePage() {
  const client = getClient();

  const homePageData = await getHomePage(client, {
    next: {
      revalidate: 1,
      cache: 'no-store',
    },
  });

  return (
    <Link href="/posts" className="block relative h-[100vh] w-full">
      <section className="relative h-full w-full flex flex-col justify-start md:justify-center p-4 md:pt-4 items-start pb-[95px]  md:p-[110px] overflow-x-hidden overflow-y-hidden">
        {/* Age Verification Popup */}
        <Verification />

        {/* Content Container */}
        <div className="relative flex-1 w-full border-white border-2 shadow-lg shadow-gray-600 flex overflow-hidden max-w-full h-full">
          {/* Slider */}
          <div className="w-full h-full ">
            <Slider images={homePageData?.mainImages} />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="absolute bottom-2 inset-x-0 text-center px-4 pointer-events-none">
          <h1 className="uppercase text-white text-5xl md:text-[80px] mb-[-16px] break-words leading-tight">
            Joël Bardeau
          </h1>
          <h2 className="text-white text-2xl md:text-3xl font-light leading-normal">
            Artiste Auteur
          </h2>
        </div>
      </section>
    </Link>
  );
}
