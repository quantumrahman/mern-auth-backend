// import modules ----------------------------------------->
import mongoose from 'mongoose';

// schema ------------------------------------------------->
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
            minLength: [6, 'Name must be at least 6 characters!'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            match: [/^\S+@\S+\.\S+$/, 'Email is invalid!'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minLength: [8, 'Password must be at least 8 characters!'],
            trim: true
        },
        verificationOtp: {
            type: String,
            default: ''
        },
        verificationOtpExpAt: {
            type: Number,
            default: 0
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordOtp: {
            type: String,
            default: ''
        },
        resetPasswordOtpExpAt: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// model -------------------------------------------------->
const user = mongoose.models.user || mongoose.model('user', userSchema);

// export modules ----------------------------------------->
export default user;