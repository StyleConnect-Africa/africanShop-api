// config/nodemailerConfig.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,  // use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
    },
});

export default transporter;
