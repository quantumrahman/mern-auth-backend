// import modules ----------------------------------------->
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

// app ---------------------------------------------------->
const app = express();

// middlewares -------------------------------------------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// origin ------------------------------------------------->
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// cookie parseing ---------------------------------------->
app.use(cookieParser());

// check route -------------------------------------------->
app.get('/', (req, res) => {
    res.send('Server ready for working!');
});

// routes ------------------------------------------------->
app.use('/api/v1/auth', authRouter);

// error middleware --------------------------------------->
app.use(errorMiddleware);

// export modules ----------------------------------------->
export default app;