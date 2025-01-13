
import { NextRequest,NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handles POST requests to /api

export async function POST(request) {
  const username = process.env.USER;
  const password = process.env.PASS;

  
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = formData.get("subject");
    console.log(name, email, message, subject);


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      tls : { rejectUnauthorized: false },
      auth: {
        user: username,
        pass: password,
      },
    });

    const mail = await transporter.sendMail({
      from: email,
      to: 'info@joelbardeau.com',
      subject: `Form submission: ${subject}`,
      html: `
        <p>Name: ${name} </p>
             <p>Email: ${email} </p>
        <p>Message: ${message} </p>
      `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const validateCaptcha = (response_key) => {
  return new Promise((resolve, reject) => {
    const secret_key = process.env.RECAPTCHA_SECRET

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`

    fetch(url, {
      method: 'post'
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success == true) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((err) => {
        console.log(err)
        resolve(false)
      })
  })
}