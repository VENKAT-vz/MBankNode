import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorhandler';

interface CustomError extends Error {
    statusCode?: number;
    errors?: Record<string, { message: string }>;
    code?: number;
    path?: string;
    keyValue?: Record<string, unknown>;
}

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;

    // Set Content-Type header to JSON universally here
    res.setHeader('Content-Type', 'application/json');

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack,
        });
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        // Handling Mongoose "CastError" for invalid ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 404);
        }

        // Handling Mongoose validation errors
        if (err.name === 'ValidationError' && err.errors) {
            const message = Object.values(err.errors).map(value => value.message).join(', ');
            error = new ErrorHandler(message, 400);
        }

        // Handling invalid JWT token error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON web token is invalid. Try again.';
            error = new ErrorHandler(message, 500);
        }

        // Handling expired JWT token error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON web token has expired. Try again.';
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key error
        if (err.code === 11000 && err.keyValue) {
            const duplicateFields = Object.keys(err.keyValue).map(
                key => `${key}: ${err.keyValue![key]}`
            );
            const message = `Duplicate fields entered: ${duplicateFields.join(', ')}.`;
            error = new ErrorHandler(message, 400);
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    } else {
        // Fallback for unknown environments
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
};

export default errorMiddleware;
