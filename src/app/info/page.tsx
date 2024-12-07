'use client'

import Link from 'next/link'

import { Socials } from '../components/Container'

export default function InfoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4b5563] text-white px-6 py-12">
      <Link
        href="mailto:info@joelbardeau.com"
        className="text-3xl md:text-5xl upper font-light  mb-4"
      >
        Contact
      </Link>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
        Jeune homme j&apos;ai suivi les cours classiques de dessin aux
        Beaux-Arts et pratiqué assidûment la photographie argentique. Puis une
        carrière dans le monde médico-chirurgical. Aujourd&apos;hui plus de 30
        expositions au compteur, mes travaux sont présents aux murs de nombreux
        collectionneurs. « Ma démarche est tournée principalement vers l’humain.
        Au travers de son enveloppe j’aime chercher et creuser le MOI des êtres.
        Mon travail en autoportraits est une forme d’introspection à la fois
        thérapeutique et artistique ».
      </p>
      <Link
        href="mailto:info@joelbardeau.com"
        className="text-xl md:text-xl text-center max-w-2xl mb-8  hover:text-neutral-500"
      >
        info@joelbardeau.com
      </Link>

      <div className="flex items-end gap-x-4">
        <Socials />
      </div>
    </div>
  )
}
