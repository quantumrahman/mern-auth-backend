// import modules ----------------------------------------->
import transporter from '../../config/config.nodemailer.js';
import welcomeEmailTemplate from '../../templates/welcome.email.template.js';

// email function ----------------------------------------->
const sendWelcomeEmail = async ({ username, userEmail }) => {
    if (!username || !userEmail) {
        throw new Error('Username and email are required!');
    };

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: userEmail,
        subject: 'Welcome to R.DevStack',
        html: welcomeEmailTemplate.replace('{username}', username)
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};

// export modules ----------------------------------------->
export default sendWelcomeEmail;