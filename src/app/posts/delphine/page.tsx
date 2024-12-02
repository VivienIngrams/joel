import { readToken } from '~/sanity/lib/sanity.api'
import { getClient } from '~/sanity/lib/sanity.client'
import { getDelphinePage } from '~/sanity/lib/sanity.queries'
import PostContent from '~/app/components/PostContent'

export default async function DelphinePage() {
  const client = getClient({ token: readToken })

  const post = await getDelphinePage(client, {
    next: {
      revalidate: 5,
      cache: 'no-store',
    },
  })
  console.log(post)
  return (
    <div>
          <PostContent post={post} />
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-sm text-justify">
        <p className="my-2"> A l’épreuve de nos corps</p>
          <p>
            Le travail débuté mi février avait pour objet un corps inconnu,
            parfois peu identifiable vu par le prisme de l’écran. Ce travail
            extrêmement proche de ma sensibilité au départ, s&apos;est peu à peu
            étiolé. J&apos;ai pris conscience que le maintien à distance
            qu&apos;était l&apos;écran et qui me rassurait au départ, ne me
            convenait plus et n&apos;apportait plus à mon travail matière à
            toucher une forme de vérité plastique et graphique. J&apos;avais
            besoin de plus. La résidence d&apos;artiste proposée à La Maison
            Jaune m&apos;a permis de reprendre ce travail avec un autre rapport
            au corps de l&apos;autre et l’étude de son expression intime via des
            séances photo réalisées en studio.
          </p>
        </div>
      </div>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-sm text-justify">
          
        </div>
      </div>
    </div>
  )
}
