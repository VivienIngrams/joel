import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";

// API handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const message = formData.get("message") as string | null;
    const subject = formData.get("subject") as string | null;
    const token = formData.get("g-recaptcha-response") as string | null;

    // Ensure all required fields are strings
    if (!name || !email || !message || !subject || !token) {
      return new Response(
        JSON.stringify({ message: "Invalid form submission" }),
        { status: 400 }
      );
    }

    console.log(`Received form data: ${name}, ${email}, ${subject}`);

    // Verify ReCAPTCHA
    const isHuman = await verifyReCAPTCHA(token);
    if (!isHuman) {
      return new Response(
        JSON.stringify({ message: "Failed to verify reCAPTCHA" }),
        { status: 400 }
      );
    }

    // Send email using nodemailer
    await sendEmail(name, email, subject, message);

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// Function to verify ReCAPTCHA token
async function verifyReCAPTCHA(token: string | null): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!token || !secretKey) {
    console.error("ReCAPTCHA token or secret key missing");
    return false;
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    console.log("ReCAPTCHA verification response:", response.data);
    return response.data.success;
  } catch (error) {
    console.error("Error verifying ReCAPTCHA:", error);
    return false;
  }
}

// Function to send email using nodemailer
async function sendEmail(
  name: string | null,
  email: string | null,
  subject: string | null,
  message: string | null
): Promise<void> {
  const username = process.env.USER;
  const password = process.env.PASS;

  if (!username || !password) {
    throw new Error("Email credentials not set");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: { rejectUnauthorized: false },
    auth: {
      user: username,
      pass: password,
    },
  });

  const mailOptions = {
    from: email || username,
    to: "info@joelbardeau.com",
    subject: `Form submission: ${subject || "No Subject"}`,
    html: `
      <p><strong>Name:</strong> ${name || "Anonymous"}</p>
      <p><strong>Email:</strong> ${email || "No email provided"}</p>
      <p><strong>Message:</strong> ${message || "No message provided"}</p>
    `,
  };

  console.log("Sending email...");
  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
}
