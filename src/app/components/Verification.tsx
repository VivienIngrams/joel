
'use client'

import { useState, useEffect } from 'react'

const Verification = () => {
  const [showPopup, setShowPopup] = useState(true)
  const [isOver18, setIsOver18] = useState(false)

  useEffect(() => {
    const storedValue = localStorage.getItem('isOver18')
    if (storedValue === 'true') {
      setIsOver18(true)
      setShowPopup(false)
    }
  }, [])

  const handleAgeConfirmation = (isAdult: boolean) => {
    setIsOver18(isAdult)
    setShowPopup(false)
    localStorage.setItem('isOver18', isAdult.toString()) // Save decision
  }

  if (!showPopup || isOver18) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#091129] p-6 rounded-md text-center max-w-sm w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Avertissement</h2>
        <p className="mb-4">Ce site contient des images de nudité. </p>
        <p className="mb-4 font-bold"> Avez-vous plus de 18 ans ?</p>
        <div className="flex justify-around">
          <button
            className="bg-white text-[#091129] py-2 px-6 m-4 rounded"
            onClick={() => handleAgeConfirmation(true)}
          >
            <span className='font-bold'>Oui,</span> j&apos;ai plus de 18 ans
          </button>
          <button
            className="bg-[#676d83] text-[#091129] py-2 px-6 m-4 rounded"
            onClick={() => handleAgeConfirmation(false)}
          >
            <span className='font-bold'>Non,</span> j&apos;ai moins de 18 ans
          </button>
        </div>
      </div>
    </div>
  )
}

export default Verification
