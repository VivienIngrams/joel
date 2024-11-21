'use client'

import Link from 'next/link'

export default function InfoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact</h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
       This platform is designed to showcase the art, creativity, and vision of Joël Bardeau, 
        a talented artist, photographer, and plastician.
      </p>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
       
info@joelbardeau.com
      </p>

      <div className="flex gap-4">
        <Link href="/posts">
          <button className="px-6 py-2 bg-orange-500 text-black rounded-md hover:bg-orange-600 transition-all">
            Explore Posts
          </button>
        </Link>
        <Link href="/">
          <button className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-black transition-all">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
