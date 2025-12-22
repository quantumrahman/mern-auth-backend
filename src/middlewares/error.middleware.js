// middleware --------------------------------------------->
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';

    const isProduction = process.env.NODE_DEV === 'production';

    const message = isProduction ? 'Internal server error' : err.message || 'Internal server error';

    console.error({
        status,
        code,
        message: err.message,
        stack: err.stack
    });

    return res.status(status).json({
        success: false,
        status,
        code,
        message
    });
};

// export modules ----------------------------------------->
export default errorMiddleware;