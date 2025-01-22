import { cookies } from 'next/headers'
import Image from 'next/image'
import { BsChevronDoubleDown } from 'react-icons/bs'
import React from 'react'
import { getClient } from '~/sanity/lib/sanity.client'
import { readToken } from '~/sanity/lib/sanity.api'
import { getBioPage } from '~/sanity/lib/sanity.queries'

interface BiographyContent {
  biographyText: any[]
  artisticTraining: string[]
  organizer: string[]
  exhibitions: string[]
}

interface BioData {
  imageUrl: string
  biography: {
    fr: BiographyContent
    en: BiographyContent
  }
}

const Bio = async () => {
  const client = getClient({ token: readToken })

  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'fr'

  // Fetch the bio data
  const bioDataArray: BioData[] | null = await getBioPage(client, {
    next: { revalidate: 10 },
  })

  if (!bioDataArray || bioDataArray.length === 0) {
    return <div>Error: Unable to fetch biography data.</div>
  }

  const bioData = bioDataArray[0] // Access the first item in the array
  const { imageUrl, biography } = bioData

  if (!biography) {
    return <div>Error: Biography data is missing.</div>
  }

  const currentContent = {
    biographyText: biography[language]?.biographyText || biography['fr'].biographyText,
    artisticTraining: biography[language]?.artisticTraining || biography['fr'].artisticTraining,
    organizer: biography[language]?.organizer || biography['fr'].organizer,
    exhibitions: biography[language]?.exhibitions || biography['fr'].exhibitions,
  };
  

  if (!currentContent) {
    return (
      <div>
        Error: Biography content is not available for the selected language.
      </div>
    )
  }

  const titles = {
    artisticTraining:
      language === 'fr' ? 'Formations artistiques' : 'Artistic Training',
    organizer:
      language === 'fr'
        ? 'Organisateur, Animateur, Conférencier'
        : 'Organizer, Animator, Lecturer',
    exhibitions:
      language === 'fr'
        ? 'Expositions et publications'
        : 'Exhibitions and Publications',
  }

  return (
    <div>
      {/* Header Section */}
      <div className="xl:h-[75vh] pt-12 xl:grid xl:grid-cols-2 bg-white text-gray-500 xl:mx-[10vw]">
        <div className="flex items-center justify-start xl:justify-center">
          <div className="relative flex flex-col items-center xl:justify-center h-[300px] xl:h-[500px] w-[200px] xl:w-[300px] m-6 xl:m-0">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Biography Portrait"
                className="object-contain"
                fill
                sizes="30vw"
              />
            )}
          </div>
        </div>
        <div className="xl:h-[80vh] flex flex-col justify-center text-lg xl:text-xl text-left max-w-2xl px-6 pb-16 xl:pl-4 xl:py-12">
          {currentContent.biographyText.map((block, index) => (
            <p key={index}>
              {block.children.map((child) => child.text).join(' ')}
            </p>
          ))}
        </div>
      </div>

      <div className="xl:h-[15vh] flex justify-center items-center text-center">
        <BsChevronDoubleDown className="text-2xl" />
      </div>

      {/* Content Sections */}
      <div className="mt-6 md:mt-12 2xl:mt-24 xl:col-span-2 text-left px-6 pb-16 xl:pb-24 xl:mx-auto xl:max-w-5xl">
        {currentContent.artisticTraining?.length > 0 && (
          <div>
            <h2 className="text-xl xl:text-2xl font-bold mb-6">
              {titles.artisticTraining}
            </h2>
            <ul>
              {currentContent.artisticTraining.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {currentContent.organizer?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl xl:text-2xl font-bold mb-6">
              {titles.organizer}
            </h2>
            <ul>
              {currentContent.organizer.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {currentContent.exhibitions?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl xl:text-2xl font-bold mb-6">
              {titles.exhibitions}
            </h2>
            <ul>
              {currentContent.exhibitions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bio
