import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const validateCaptcha = (responseKey) => {
  return new Promise((resolve) => {
    const secret_key = process.env.RECAPTCHA_SECRET;

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${responseKey}`;

    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((googleResponse) => {
        resolve(googleResponse.success);
      })
      .catch((err) => {
        console.error('Captcha validation error:', err);
        resolve(false);
      });
  });
};

export async function POST(req) {
  try {
    const formData = Object.fromEntries(await req.formData());
    const { name, email, message, subject, 'g-recaptcha-response': captchaResponse } = formData;

    // Log request data
    console.log('Form data:', formData);

    // Validate ReCAPTCHA
    if (!(await validateCaptcha(captchaResponse))) {
      console.error('Invalid ReCAPTCHA response');
      return NextResponse.json({ error: 'Invalid ReCAPTCHA' }, { status: 400 });
    }

    // Log ReCAPTCHA success
    console.log('ReCAPTCHA validated successfully');

    // Email sending logic
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'info@joelbardeau.com',
      subject: `Form submission: ${subject}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    console.log('Email sent successfully');
    return NextResponse.json({ message: 'Success: email was sent' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
