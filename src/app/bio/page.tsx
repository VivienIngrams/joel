import Link from 'next/link'
import Image from 'next/image'

import React from 'react'

const Bio = () => {
  return (
    <div className="min-h-screen pt-12 xl:grid xl:grid-cols-2 bg-white text-gray-500 xl:mx-[10vw]">
      <div className="flex items-center justify-start xl:justify-center">
        <div className="relative xl:min-h-screen flex flex-col items-center xl:justify-center h-[300px] xl:h-[500px] w-[200px] xl:w-[300px] m-6 xl:m-0">
          <Image
            src="/joel portrait.jpg"
            className="object-contain"
            fill
            sizes="30vw"
            alt="Portrait Joel"
          />
        </div>
      </div>
      <div className="xl:min-h-screen flex flex-col justify-center text-lg xl:text-xl text-left max-w-2xl px-6 pb-16 xl:pl-4 xl:py-12">
        <p className="mb-4">
          Jeune homme, j’ai suivi les cours classiques de dessin aux
          Beaux-Arts et pratiqué assidûment la photographie argentique.
        </p>
        <p className="mb-4">
          Puis, j’ai entamé une carrière dans le monde médico-chirurgical.
        </p>
        <p className="mb-4">
          Aujourd’hui, avec plus de 30 expositions à mon actif, mes travaux sont
          présents aux murs de nombreux collectionneurs.
        </p>
        <p className="italic">
          « Ma démarche est principalement tournée vers l’humain.
        </p>
        <p className="italic">
          À travers son enveloppe, j’aime chercher et explorer le MOI des
          êtres.
        </p>
        <p className="italic mb-6">
          Depuis 2005, la photographie est devenue mon quotidien.
        </p>
        <p className="mb-4">
          « De par mon passé professionnel, je considère le corps seulement comme
          une enveloppe. Se libérer des masques que la société nous pousse à porter,
          par une ‘’mise à nu’’ de sa propre image, est un chemin vers la sérénité.
        </p>
        <p className="mb-4">
          Extraire le corps vital en le détachant du corps esthétique.
        </p>
        <p className="mb-4">
          À travers mes créations, j’invite le visiteur à déposer ses masques et à
          questionner son intimité.
        </p>
        <p className="mb-4">
          Mon travail en autoportraits est une introspection à la fois thérapeutique
          et artistique. Je ne cherche en aucune manière à choquer, mais simplement
          à proposer un voyage au-delà de la surface visible.
        </p>
        <p className="mb-4">
          Mes travaux sont présents aux murs de nombreux collectionneurs.
        </p>
      </div>
    </div>
  )
}

export default Bio
