// app/api/sendEmail/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { fullName, businessName, phoneNumber, email } = await request.json();
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return NextResponse.json({ message: 'Missing environment variables' }, { status: 500 });
  }
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });

  // Set email options
  let mailOptions = {
    from: `"TradesMark" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: 'aaronjiang2001@gmail.com',
    subject: 'Form Submission',
    text: `
      Full Name: ${fullName}
      Business Name: ${businessName}
      Phone Number: ${phoneNumber}
      Email: ${email}
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
}
