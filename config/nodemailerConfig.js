import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.APP_PASS  // Your email password
  }
});

export default transporter; 