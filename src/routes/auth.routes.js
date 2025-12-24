// import modules ----------------------------------------->
import express from 'express';
import { signUpController, signInController } from '../controllers/auth.controller.js';

// router ------------------------------------------------->
const router = express.Router();

// routes ------------------------------------------------->
router.route('/sign_up').post(signUpController);
router.route('/sign_in').post(signInController);

// export modules ----------------------------------------->
export default router;