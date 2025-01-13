'use client'

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
 
const ContactForm: React.FC = () => {
  const site_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value); // Store the captcha response
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!captchaValue) {
      alert("Please complete the ReCAPTCHA before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    // Append the captcha response
    formData.append('g-recaptcha-response', captchaValue);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Message successfully sent');
    } catch (err) {
      console.error(err);
      alert('Error, please try resubmitting the form');
    }
  }

  return (
    <form
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="font-cinzel w-full"
    >
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
          className="font-arsenal border-2  rounded border-stone-400 p-1"
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
          className="font-arsenal border-2  rounded border-stone-400 p-1"
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
          className="font-arsenal border-2  rounded border-stone-400 p-1"
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

      <ReCAPTCHA
        sitekey={site_key}
        onChange={handleCaptchaChange}
        className="py-2"
      />

      <button
        type="submit"
        className="mt-4 hover:text-black hover:scale-105 ease-in duration-600 border-2 rounded-lg shadow-md p-2 bg-gray-100"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
