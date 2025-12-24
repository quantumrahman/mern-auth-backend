// import modules ----------------------------------------->
import bcrypt from 'bcrypt';

// generator ---------------------------------------------->
const generateHashPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// export modules ----------------------------------------->
export default generateHashPass;