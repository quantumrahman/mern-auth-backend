// import modules ----------------------------------------->
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/constructors/error.constructor.js';

// middleware --------------------------------------------->
const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) throw new AppError("Authentication token missing!", {
            status: 401,
            code: "UNAUTHORIZED"
        });

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new AppError("Invalid or expired token!", {
                status: 401,
                code: "UNAUTHORIZED"
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) throw new AppError("User not found!", {
            status: 401,
            code: "UNAUTHORIZED"
        });

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

// export modules ----------------------------------------->
export default authMiddleware;