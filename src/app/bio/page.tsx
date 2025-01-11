import Link from 'next/link'
import Image from 'next/image'

import React from 'react'

const Bio = () => {
  return (
    <div className="min-h-screen pt-12 md:grid md:grid-cols-2 bg-white text-gray-500 md:mx-[10vw]">
      <div className="flex items-center justify-start md:justify-center">
        <div className="relative md:min-h-screen flex flex-col items-center md:justify-center h-[300px] md:h-[500px] w-[200px] md:w-[300px] m-6 md:m-0">
          <Image
            src="/joel portrait.jpg"
            className="object-contain"
            fill
            sizes="30vw"
            alt="Portrait Joel"
          />
        </div>
      </div>
      <div className="md:min-h-screen flex flex-col justify-center text-lg md:text-xl text-left max-w-2xl px-6 pb-16 md:pl-4 md:py-12">
        <p className="mb-4">
          Jeune homme j&apos;ai suivi les cours classiques de dessin aux
          Beaux-Arts et pratiqué assidûment la photographie argentique.
        </p>
        <p className="mb-4">
          Puis une carrière dans le monde médico-chirurgical.
        </p>
        <p className="mb-4">
          Aujourd&apos;hui plus de 30 expositions au compteur, mes travaux sont
          présents aux murs de nombreux collectionneurs.
        </p>
        <p className="italic">
          «Ma démarche est tournée principalement vers l&apos;humain.
        </p>
        <p className="italic">
          Au travers de son enveloppe j&apos;aime chercher et creuser le MOI des
          êtres.
        </p>
        <p className="italic mb-6">
          Mon travail en autoportraits est une forme d&apos;introspection à la
          fois thérapeutique et artistique».
        </p>
      </div>
    </div>
  )
}

export default Bio
