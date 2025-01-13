'use client';

import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm: React.FC = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error(`Failed reCAPTCHA verification: ${response.status}`);
        }

        setIsVerified(true);
      }
    } catch (error) {
      console.error(error);
      setIsVerified(false);
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  const handleCaptchaExpired = () => {
    setIsVerified(false);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isVerified) {
      alert("Please complete the reCAPTCHA verification before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    console.log(...formData.entries());

    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Message successfully sent');
    } catch (error) {
      console.error(error);
      alert('Error, please try resubmitting the form');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="font-cinzel w-full">
      <div className="flex flex-col">
        <label htmlFor="name" className="uppercase text-sm py-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="off"
          required
          minLength={3}
          maxLength={150}
          className="font-arsenal border-2 rounded border-stone-400 p-1"
          type="text"
        />
      </div>

      <div className="flex flex-col py-1">
        <label htmlFor="email" className="uppercase text-sm py-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          autoComplete="off"
          required
          minLength={8}
          maxLength={150}
          className="font-arsenal border-2 rounded border-stone-400 p-1"
          type="email"
        />
      </div>

      <div className="flex flex-col py-1">
        <label htmlFor="subject" className="uppercase text-sm py-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          autoComplete="off"
          className="font-arsenal border-2 rounded border-stone-400 p-1"
          type="text"
        />
      </div>

      <div className="flex flex-col py-1">
        <label htmlFor="message" className="uppercase text-sm py-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          minLength={20}
          maxLength={600}
          className="font-arsenal border-2 rounded border-stone-400 p-1"
          rows={5}
        />
      </div>

      <div className="flex flex-col py-2">
        <ReCAPTCHA
          sitekey={siteKey}
          ref={recaptchaRef}
          onChange={handleCaptchaChange}
          onExpired={handleCaptchaExpired}
        />
      </div>

      <button
        type="submit"
        className="mt-4 hover:text-black hover:scale-105 ease-in duration-600 border-2 rounded-lg shadow-md p-2 bg-gray-100"
        disabled={!isVerified}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
