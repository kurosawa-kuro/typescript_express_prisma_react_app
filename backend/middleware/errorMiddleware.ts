import express from 'express';

type Error = {
    message?: string;
};

const notFound = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new Error(`Not Found -${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
};

export { notFound, errorHandler };
