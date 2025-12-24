// import modules ----------------------------------------->
import express from 'express';
import { signUpController } from '../controllers/auth.controller';

// router ------------------------------------------------->
const router = express.Router();

// routes ------------------------------------------------->
router.route('/sign_up').post(signUpController);

// export modules ----------------------------------------->
export default router;