// validator ---------------------------------------------->
const emailValidator = (email) => {
    if (typeof email !== 'string') return false;

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    
    return emailRegex.test(normalizedEmail);
};

// export modules ----------------------------------------->
export default emailValidator;