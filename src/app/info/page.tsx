'use client'

import Link from 'next/link'

import { Socials } from '../components/Container'

export default function InfoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#091129] text-white px-6 py-12">
      <h1 className="text-3xl md:text-5xl uppercase font-thin font-barlow mb-4">Contact</h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
   
      </p>
      <Link
        href="mailto:info@joelbardeau.com"
        className="text-lg md:text-xl text-center max-w-2xl mb-8  hover:text-neutral-500"
      >
        info@joelbardeau.com
      </Link>

      <div className="flex items-end gap-x-4">
        <Socials />
      </div>
    </div>
  )
}
