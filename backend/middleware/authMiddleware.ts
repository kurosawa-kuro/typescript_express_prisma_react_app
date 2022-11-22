import express from 'express';
import { stringify } from 'querystring';
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
import { db } from "../utils/db";

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
};

const protect = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, "process.env.JWT_SECRET")
            // console.log({ decoded })

            // Get user from the token
            req.user = await db.user.findUnique({
                where: {
                    id: decoded.id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                },
            });

            // console.log("req.user", req.user)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { protect };
