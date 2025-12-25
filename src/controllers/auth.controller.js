// import modules ----------------------------------------->
import 'dotenv/config';
import crypto from 'crypto';
import User from '../models/user.model.js';
import generateOtp from '../utils/generator/otp.generator.js'
import generatorJwt from '../utils/generator/jwt.generator.js';
import AppError from '../utils/constructors/error.constructor.js';
import emailValidator from '../utils/validator/email.validator.js';
import compareValidator from '../utils/validator/compare.validator.js';
import sendWelcomeEmail from '../utils/services/send.welcome.email.js';
import generateHashPassword from '../utils/generator/hashpass.generator.js';
import sendVerificationOtpEmail from '../utils/services/send.verification.otp.email.js';

// signup controller -------------------------------------->
export const signUpController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) throw new AppError("All fields is required!", {
            status: 400,
            code: "VALIDATION_ERROR",
            details: {
                fields: ['name', 'email', 'password'],
            },
        });

        const isValidEmail = emailValidator(email);

        if (!isValidEmail) throw new AppError("Email is invalid!", {
            status: 400,
            code: "VALIDATION_ERROR",
            details: {
                field: 'email',
            },
        });

        const MIN_PASSWORD_LENGTH = 8;

        if (password.length < MIN_PASSWORD_LENGTH) throw new AppError("Password must be at least 8 characters!", {
            status: 400,
            code: "VALIDATION_ERROR",
            details: {
                field: 'password',
            },
        });

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) throw new AppError("A user with this email already exists!", {
            status: 409,
            code: "USER_ALREADY_EXISTS",
        });

        const hashedPassword = await generateHashPassword(password);

        const createUser = new User({
            name: name,
            email: normalizedEmail,
            password: hashedPassword
        });

        await createUser.save();

        const token = generatorJwt({
            userId: createUser._id,
            userEmail: createUser.email
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        sendWelcomeEmail({
            username: name,
            userEmail: email
        })
        .catch(err => console.error("Email error: ", err));

        const userObj = createUser.toObject();
        delete userObj.password;

        return res.status(201).json({
            success: true,
            message: "User register successfully.",
            user: userObj,
        });

    } catch (error) {
        next(error);
    }
};

// signin controller -------------------------------------->
export const signInController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new AppError("Invalid credentials!", {
            status: 401,
            code: "AUTHENTICATION_ERROR"
        });

        const isValidEmail = emailValidator(email);

        if (!isValidEmail) throw new AppError("Invalid credentials!", {
            status: 401,
            code: "AUTHENTICATION_ERROR"
        });

        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) throw new AppError("Invalid credentials!", {
            status: 401,
            code: "AUTHENTICATION_ERROR"
        });

        const isPasswordMatch = await compareValidator({
            inputPassword: password,
            hashPassword: user.password
        });

        if (!isPasswordMatch) throw new AppError("Invalid credentials!", {
            status: 401,
            code: "AUTHENTICATION_ERROR"
        });

        const token = generatorJwt({
            userId: user._id,
            userEmail: user.email
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            success: true,
            message: "User login successfully.",
            user: userObj
        });
    } catch (error) {
        next(error);
    }
};

// signout controller ------------------------------------->
export const signOutController = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "User logout successfully!"
        });
    } catch (error) {
        next(error);
    }
};

// auth verification otp controller ----------------------->
export const verificationOtpController = async (req, res, next) => {
    try {
        const authUser = req.user;

        if (!authUser) throw new AppError("Invalid or expired token!", {
            status: 401,
            code: "UNAUTHORIZED"
        });

        const user = await User.findById(user._id);

        if (!user) throw new AppError("User not found!", {
            status: 404,
            code: "USER_NOT_FOUND"
        });

        if (user.isVerified) throw new AppError("Account already verified!", {
            status: 400,
            code: "ALREADY_VERIFIED"
        });

        const verificationOtp = generateOtp();
        const hashOtp = crypto.createHash('sha256').update(verificationOtp).digest('hex');

        user.verificationOtp = hashOtp;
        user.verificationOtpExpAt = Date.now() + 5 * 60 * 1000;

        await user.save();

        sendVerificationOtpEmail({
            username: user.name,
            userEmail: user.email,
            verificationOtp: verificationOtp
        })
        .catch(err => console.log("Email error: ", err));

        return res.status(200).json({
            success: true,
            message: "Send verification otp."
        });

    } catch (error) {
        next(error);
    }
};