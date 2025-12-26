// import modules ----------------------------------------->
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
    signUpController,
    signInController,
    signOutController,
    verificationOtpController,
    verifyEmailController,
    resetPasswordOtpController
} from '../controllers/auth.controller.js';

// router ------------------------------------------------->
const router = express.Router();

// routes ------------------------------------------------->
router.route('/signup').post(signUpController);
router.route('/signin').post(signInController);
router.route('/signout').post(signOutController);
router.route('/send-reset-password-otp').post(resetPasswordOtpController);

// route middleware --------------------------------------->
router.use(authMiddleware);

// protected routes --------------------------------------->
router.route('/send-verification-otp').post(verificationOtpController);
router.route('/verify-email').patch(verifyEmailController);

// export modules ----------------------------------------->
export default router;