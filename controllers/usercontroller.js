// controllers/userController.js

import { welcomeEmailTemplate } from '../utils/emailTemplates.js';
import { sendEmail } from '../utils/sendEmail.js';

export const registerUser = async (req, res) => {
    // User registration logic here
    // Assuming 'user' is the registered user object
    try {
        const emailContent = welcomeEmailTemplate(user.username);
        await sendEmail(user.email, emailContent.subject, emailContent.text, emailContent.html);
        res.status(201).json({ message: 'User registered and email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
