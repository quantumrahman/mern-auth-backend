// import modules ----------------------------------------->
import jwt from 'jsonwebtoken';

// generator ---------------------------------------------->
const generatorJwt = ({ userId, userEmail }) => {
    return jwt.sign({ userId, userEmail }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// export modules ----------------------------------------->
export default generatorJwt;