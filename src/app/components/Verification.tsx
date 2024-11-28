'use client';

import { useState, useEffect } from 'react';

const Verification = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [message, setMessage] = useState('');

  // Check if the user has already confirmed their age
  useEffect(() => {
    const storedValue = localStorage.getItem('isOver18');
    if (storedValue === 'true') {
      setShowPopup(false); // Don't show the popup if the user has already confirmed
    }
  }, []);

  const handleAgeConfirmation = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('isOver18', 'true'); // Persist the confirmation
      setShowPopup(false); // Close the popup
    } else {
      setMessage('This website is only for individuals 18 years or older.');
    }
  };

  if (!showPopup) {
    return null; // Don't render the popup if `showPopup` is false
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#818895] p-6 rounded-md text-center max-w-xs sm:max-w-sm w-full mx-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Avertissement</h2>
        <p className="mb-4">Ce site contient des images de nudité.</p>
        <p className="mb-4 font-bold">Avez-vous plus de 18 ans ?</p>
        <div className="flex flex-col sm:flex-row justify-around">
          <button
            className="bg-white text-[#818895] py-2 px-6 m-2 rounded"
            onClick={() => handleAgeConfirmation(true)}
          >
            <span className="font-bold">Oui,</span> j&apos;ai plus de 18 ans
          </button>
          <button
            className="bg-[#454648] text-[#818895] py-2 px-6 m-2 rounded"
            onClick={() => handleAgeConfirmation(false)}
          >
            <span className="font-bold">Non,</span> j&apos;ai moins de 18 ans
          </button>
        </div>
        {message && <p className="mt-4 text-red-500 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default Verification;

