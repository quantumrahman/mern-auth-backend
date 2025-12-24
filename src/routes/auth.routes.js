// import modules ----------------------------------------->
import express from 'express';
import { signUpController } from '../controllers/auth.controller.js';

// router ------------------------------------------------->
const router = express.Router();

// routes ------------------------------------------------->
router.route('/sign_up').post(signUpController);
router.route('/sign_in').post('');

// export modules ----------------------------------------->
export default router;