// utils/sendEmail.js

import transporter from '../config/nodemailerConfig.js';

export const sendEmail = async (to, subject, text, html = '') => {
    if (!to) {
        throw new Error('Recipient email address is required');
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};
