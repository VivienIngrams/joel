'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Socials } from '../components/Container'

export default function InfoPage() {
  return (
    <div className="min-h-screen md:grid md:grid-cols-3 bg-[#4b5563] text-white md:mx-[10vw]">
      <div className="md:min-h-screen flex flex-col md:items-center md:justify-center px-6   md:py-12">
        <Link
          href="mailto:info@joelbardeau.com"
          className="text-3xl md:text-5xl font-light mt-16 mb-4 md:mt-0"
        >
          Contact
        </Link>
        <Link
          href="mailto:info@joelbardeau.com"
          className="text-xl md:text-xl md:text-center max-w-2xl mb-4 md:mb-8  hover:text-neutral-500"
        >
          info@joelbardeau.com
        </Link>

        <div className="flex items-end gap-x-4">
          <Socials />
        </div>
      </div>
      <div className="md:min-h-screen flex flex-col items-center md:justify-center p-6">

     
     
        <Image
        src="/joel portrait.jpg"  height="600" width="300" alt="Portrait Joel"/></div>
      <div className="md:min-h-screen flex flex-col items-center justify-center text-lg md:text-xl text-justify max-w-2xl px-6 pb-16 md:px-16 md:py-12">
        <p className=" mb-4">
          Jeune homme j&apos;ai suivi les cours classiques de dessin aux
          Beaux-Arts et pratiqué assidûment la photographie argentique.</p>
          <p className=" mb-4"> Puis une
          carrière dans le monde médico-chirurgical.
        </p>
        <p className=" mb-4">
          Aujourd&apos;hui plus de 30 expositions au compteur, mes travaux sont
          présents aux murs de nombreux collectionneurs.
        </p>
        <p className="italic ">
          «Ma démarche est tournée principalement vers l&apos;humain. 
          </p> <p className="italic ">
          Au travers de
          son enveloppe j&apos;aime chercher et creuser le MOI des êtres. 
          </p> <p className="italic ">
          Mon travail
          en autoportraits est une forme d&apos;introspection à la fois thérapeutique
          et artistique».
        </p>
      </div>
    </div>
  )
}
