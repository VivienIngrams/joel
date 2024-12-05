import MobileScroll from '~/app/components/MobileScroll'
import HorizontalScroll from '~/app/components/HorizontalScroll'
import PostContent from '~/app/components/PostContent'
import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getDelphinePage } from '~/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'

export default async function DelphinePage() {
  const client = getClient({ token: readToken })

  const post = await getDelphinePage(client, {
    next: {
      revalidate: 10,
    },
  })

  // Split images into three equal parts
  const splitImages = (images: any[], parts: number) => {
    const imagesPerPart = Math.ceil(images.length / parts)
    let result = []
    for (let i = 0; i < parts; i++) {
      result.push(images.slice(i * imagesPerPart, (i + 1) * imagesPerPart))
    }
    return result
  }

  const [firstPart, secondPart, thirdPart, fourthPart] = splitImages(
    post.images,
    4,
  )

  return (
    <>
      <div className="md:h-screen md:w-full flex flex-col items-center justify-center bg-[#4b5563] text-white  md:px-0 py-12">
        <PostContent post={post} />   <div className="relative md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
          {/* Mobile View - First Part of Images */}
          <div className="h-full w-full md:hidden mb-20">
            <MobileScroll images={firstPart} title={post.title} />
          </div>
          {/* Horizontal Scrolling Image Gallery on the Right - First Part */}
          <div className="hidden overflow-hidden md:block md:flex-grow md:pl-4 h-full">
            <HorizontalScroll images={firstPart} title={post.title} />
          </div>
        </div>{' '}</div>
        
     
        <div className="relative md:h-full w-screen md:mt-32 flex flex-col justify-center md:justify-start md:flex-row">
          {/* Mobile View - First Part of Images */}
          <div className="h-full w-full md:hidden mb-20">
            <MobileScroll images={firstPart} title={post.title} />
          </div>
          {/* Horizontal Scrolling Image Gallery on the Right - First Part */}
          <div className="hidden overflow-hidden md:block md:flex-grow md:pl-4 h-full">
            <HorizontalScroll images={firstPart} title={post.title} />
          </div>
        </div>{' '}
      
      <div className="md:h-screen md:w-full flex flex-col items-center justify-center bg-[#4b5563] text-white px-6 md:px-0 py-12">
        <div className="mt-3 md:mt-16 text-xl text-justify max-w-[450px] mb-8">
          <p className="mb-2">
            On se pose souvent sur le résultat mais se pose t&apos;on sur le
            moment du faire, sur l&apos;instant ? À quoi penses tu ? Que ressens
            tu ? De quoi as tu envie ? Est-ce que tu as peur? Montrer son corps
            comme confession intime. Et tenter de retranscrire l&apos;instant
            photographique, l&apos;instant graphique, le vrai de cet instant.{' '}
          </p>
          <p className="mb-2">
            Ici il sera question de réintroduire la question de l&apos;humanité
            ou de la déshumanisation du modèle. À quel moment le modèle ne joue
            plus ? À quel moment le modèle donne à voir une vérité ? A quel
            moment l&apos;acte de résistance de ce corps tombe .
          </p>
          <p className="mb-2">
            Le corps du modèle face au corps sensoriel et au regard de
            l&apos;artiste peintre Le corps comme obstacle au dévoilement de la
            vérité et le corps comme exposition totale de cette même vérité.
          </p>
          <p className="mb-2">
            Le dessin sera une description de cet instant si il a lieu.
          </p>
        </div>
      </div>

      <div className="relative md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
        {/* Mobile View - Second Part of Images */}
        <div className="h-full w-full md:hidden mb-20">
          <MobileScroll images={secondPart} title={post.title} />
        </div>
        {/* Horizontal Scrolling Image Gallery on the Right - Second Part */}
        <div className="hidden overflow-hidden md:block md:flex-grow md:pl-4 h-full">
          <HorizontalScroll images={secondPart} title={post.title} />
        </div>
      </div>
      <div className="md:h-screen md:w-full flex flex-col items-center justify-center bg-[#4b5563] text-white px-6 md:px-0 py-12">
        <div className="mt-3 md:mt-16 block text-xl text-justify max-w-[450px] mb-8">
          <p className="mb-2">
            Un premier travail photographique, réalisé en juin 2022, donne lieu
            à des corps objets ou des morceaux de corps, des sorties de champ,
            corps coupés, corps imaginés où le cadrage photographique rend
            compte d&apos;une autre réalité. Cette première étape est nécéssaire
            car elle implique un regard différent par l&apos;aspect temporel
            immédiat de l&apos;instant photographique où le corps de
            l&apos;artiste modèle devient une forme d&apos;écriture. Je tiens au
            non décor puisque mon travail se concentre sur ce corps de
            l&apos;autre sans artifice, nu ou pas. J&apos;ai commencé les
            séances photo par des postures que j&apos;avais déjà réalisées.
          </p>
          <p className="mb-2">
            Puis, j’ai pensé que je voulais tronquer ces corps
          </p>
        </div>
      </div>
      <div className="relative md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
        {/* Mobile View - Third Part of Images */}
        <div className="h-full w-full md:hidden mb-20">
          <MobileScroll images={thirdPart} title={post.title} />
        </div>
        {/* Horizontal Scrolling Image Gallery on the Right - Third Part */}
        <div className="hidden overflow-hidden md:block md:flex-grow md:pl-4 h-full">
          <HorizontalScroll images={thirdPart} title={post.title} />
        </div>
      </div>

      <div className="md:h-screen md:w-full flex flex-col items-center justify-center bg-[#4b5563] text-white px-6 md:px-0 py-12">
        <div className="mt-3 md:mt-16 hidden md:block text-xl text-justify max-w-[450px] mb-8">
          <p className="mb-2">
            Plus qu&apos;un photographe, j&apos;avais l&apos;attitude d&apos;une
            exploratrice de ce corps que je voulais faire parler. La proximité
            des prises de vue s&apos;est peu à peu imposée comme les hors
            champs, les cadrages sont plus de l&apos;ordre d&apos;une
            réalisation graphique, picturale. Une sorte de jeu entre le plein et
            le vide. Cette intrusion à ce corps a amené le modèle à se confier
            soit par la parole, soit par les gestes, soit par la sensibilité et
            l&apos;émotion. Une forme courte de vérité offerte par
            l&apos;artiste modèle à l&apos;artiste plasticienne. Ensuite, la
            réflexion du peintre.
          </p>
          <p>
            Ce que j&apos;avais initié sans trop en avoir conscience, c&apos;est
            l&apos;évocation de ce corps représenté en pleine puissance
            évocatrice. Ce que parfois j&apos;associais au pathos n&apos;était
            en fait que cette représentation de l&apos;image qui survivrait dans
            mon propre corps. Une sorte de mémoire sensorielle qui
            instinctivement se révélait au geste pictural. La résidence me
            permet de pleinement y travailler.
          </p>
        </div>
      </div>

      <div className="relative md:h-full w-screen flex flex-col justify-center md:justify-start md:flex-row">
        {/* Mobile View - Third Part of Images */}
        <div className="h-full w-full md:hidden mb-20">
          <MobileScroll images={fourthPart} title={post.title} />
        </div>
        {/* Horizontal Scrolling Image Gallery on the Right - Third Part */}
        <div className="hidden overflow-hidden md:block md:flex-grow md:pl-4 h-full">
          <HorizontalScroll images={thirdPart} title={post.title} />
        </div>
      </div>

      <div className="md:h-screen md:w-full flex flex-col items-center justify-center bg-[#4b5563] text-white px-6 md:px-0 py-12">
        <div className="mt-3 md:mt-16 hidden md:block text-xl text-justify max-w-[450px] mb-8">
          <p className="mb-2">
            Chaque prise de vue sera suivie par une réflexion plastique et
            graphique sur papier où le dessin, le découpage, le collage
            plastique et photographique, la peinture sera une réponse
            instinctive , mémorielle face à la confession de l&apos;intime du
            modèle. Le dessin sera réalisé de suite après la séance
            photographique, puis sur des temps plus longs et éloignés. Un temps
            élastique dont les réalisations attesteront de l&apos;éloignement de
            ce moment entre nous deux. A voir si à mesure que le temps effacera,
            d&apos;autres évocations apparaitront en moi.
          </p>
          <p>
            Comment rendre compte de cet instant de communion de confession et
            de sincérité. L&apos;idée ici n&apos;étant pas de réaliser une copie
            d&apos;une photographie mais bien de donner à voir l&apos;instant de
            vérité du corps mise à nu. Ces cylindres de papier qui cachent
            encore un peu du regard l&apos;instant photographique, fragile.
          </p>
        </div>
      </div>
    </>
  )
}
