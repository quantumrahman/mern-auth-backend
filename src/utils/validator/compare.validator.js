// import modules ----------------------------------------->
import bcrypt from 'bcrypt';
import AppError from '../constructors/error.constructor.js';

// validator ---------------------------------------------->
const compareValidator = async ({ inputPassword, hashPassword }) => {
    if (!inputPassword || !hashPassword) {
        throw new AppError("Invalid credentials", {
            status: 401,
            code: "AUTHENTICATION_ERROR"
        });
    };
    
    try {
        return Boolean(await bcrypt.compare(inputPassword, hashPassword));
    } catch (error) {
        throw new AppError("Password comparison failed", {
            status: 500,
            code: "INTERNAL_SERVER_ERROR"
        });
    }
};

// export modules ----------------------------------------->
export default compareValidator;