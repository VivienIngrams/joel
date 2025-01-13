'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const Verification = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [message, setMessage] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const [showYesButton, setShowYesButton] = useState(true); // State to control visibility of "Yes" button
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    // Check if the user has already interacted with the age verification in this session
    const hasVerifiedAge = sessionStorage.getItem('hasVerifiedAge');
    
    // If the user has verified their age before in this session, hide the popup
    if (hasVerifiedAge === 'true') {
      setShowPopup(false);
    }
  }, []);

  // Handle age confirmation logic
  const handleAgeConfirmation = (isAdult: boolean) => {
    if (isAdult) {
      setShowPopup(false); // Close the popup if the user is over 18
      sessionStorage.setItem('hasVerifiedAge', 'true'); // Store the confirmation in sessionStorage
    } else {
      setMessage('This website is only for individuals 18 years or older.');
      setRedirecting(true); // Start the redirection process
      setShowYesButton(false); // Hide the "Yes" button when "No" is clicked

      // Show the message and then redirect after a delay
      setTimeout(() => {
        router.push('/'); // Redirect to the home page after 3 seconds
      }, 3000); // Wait for 3 seconds to give time for the user to see the message
    }
  };

  // Don't render the popup if `showPopup` is false
  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black font-arsenal bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-500 p-6 rounded-md text-center max-w-xs sm:max-w-sm w-full mx-4">
        <h2 className="text-xl xl:text-3xl font-bold mb-4">Avertissement</h2>
        <p className="mb-4">Ce site contient des images de nudité.</p>
        <p className="mb-4 font-bold">Avez-vous plus de 18 ans ?</p>
        <div className="flex flex-col sm:flex-row justify-around">
          {showYesButton && (
            <button
              className="bg-gray-200 text-gray-600 py-2 px-6 m-2 rounded"
              onClick={() => handleAgeConfirmation(true)}
            >
              <span className="font-bold">Oui,</span> j&apos;ai plus de 18 ans
            </button>
          )}
          <button
            className="bg-[#454648] text-white py-2 px-6 m-2 rounded"
            onClick={() => handleAgeConfirmation(false)}
          >
            <span className="font-bold">Non,</span> j&apos;ai moins de 18 ans
          </button>
        </div>
        {message && <p className="mt-4 text-red-500 text-lg">{message}</p>}
      </div>
    </div>
  );
};

export default Verification;
