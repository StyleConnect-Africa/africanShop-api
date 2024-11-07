// utils/emailTemplates.js

export const welcomeEmailTemplate = (username) => {
    return {
        subject: 'Welcome to Our Fashion Shop!',
        html: `<h1>Hello, ${username}</h1>
               <p>Thank you for joining our fashion community! We’re excited to have you.</p>`,
        text: `Hello, ${username}! Thank you for joining our fashion community! We’re excited to have you.`
    };
};
