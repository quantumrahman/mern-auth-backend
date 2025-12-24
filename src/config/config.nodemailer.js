// import modules ----------------------------------------->
import nodemailer from 'nodemailer';

// transporter -------------------------------------------->
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// export modules ----------------------------------------->
export default transporter;