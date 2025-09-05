export const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack);
    }
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
};