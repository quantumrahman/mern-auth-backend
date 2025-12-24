// import modules ----------------------------------------->
import 'dotenv/config';
import User from '../models/user.model.js';
import generatorJwt from '../utils/generator/jwt.generator.js';
import AppError from '../utils/constructors/error.constructor.js';
import emailValidator from '../utils/validator/email.validator.js';
import sendWelcomeEmail from '../utils/services/send.welcome.email.js';
import generateHashPassword from '../utils/generator/hashpass.generator.js';

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

        const existingUser = await User.findOne({ email });

        if (existingUser) throw new AppError("A user with this email already exists!", {
            status: 409,
            code: "USER_ALREADY_EXISTS",
        });

        const hashedPassword = await generateHashPassword(password);

        const createUser = new User({
            name: name,
            email: email,
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