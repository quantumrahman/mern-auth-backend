// import modules ----------------------------------------->
import transporter from '../../config/config.nodemailer.js';
import verificationOtpEmailTemplate from '../../templates/verification.otp.email.template.js';

// email function ----------------------------------------->
const sendVerificationOtpEmail = async ({ username, userEmail, verificationOtp }) => {
    if (!username || !userEmail || !verificationOtp) {
        throw new Error("Username, email and verification otp are required!");
    };

    const mailOptions = {
        from: `R.DevStack <${process.env.SENDER_EMAIL}>`,
        to: userEmail,
        subject: 'Verify your account.',
        html: verificationOtpEmailTemplate.replace('{verification otp}', verificationOtp).replace('{username}', username)
    };

    const info = transporter.sendMail(mailOptions);
    return info;
};

// export modules ----------------------------------------->
export default sendVerificationOtpEmail;