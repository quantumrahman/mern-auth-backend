// import modules ----------------------------------------->
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { signUpController, signInController, signOutController } from '../controllers/auth.controller.js';

// router ------------------------------------------------->
const router = express.Router();

// routes ------------------------------------------------->
router.route('/sign_up').post(signUpController);
router.route('/sign_in').post(signInController);
router.route('/sign_out').get(signOutController);

// route middleware --------------------------------------->
router.use(authMiddleware);

// protected routes --------------------------------------->

// export modules ----------------------------------------->
export default router;