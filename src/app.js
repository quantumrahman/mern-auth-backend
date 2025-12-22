// import modules ----------------------------------------->
import 'dotenv/config';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// app ---------------------------------------------------->
const app = express();

// middlewares -------------------------------------------->
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

// origin ------------------------------------------------->
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// cookie parseing ---------------------------------------->
app.use(cookieParser());

// check route -------------------------------------------->
app.get('/', (req, res) => {
    res.send('Server ready for working!');
});

// export modules ----------------------------------------->
export default app;