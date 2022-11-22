import { Request, Response } from "express";

import { User, createUserService, readUsersService, readUserService, updateUserService, deleteUserService } from "../services/userService";
import asyncHandler from '../utils/asyncHandler';

// @desc    Create user
// @route   POST /users
// @access  Public
const createUserAction = asyncHandler(async (req: Request, res: Response) => {
    const body: User = req.body;
    const user = await createUserService(body);

    return res.status(201).json({ user });
});

// @desc    Read users
// @route   GET /users
// @access  Public
const readUsersAction = asyncHandler(async (req: Request, res: Response) => {
    // console.log("req.user after protect", req.user)
    const users = await readUsersService();

    return res.status(200).json({ users });
});

// // @desc    Read user
// // @route   GET /users/:id
// // @access  Public
const readUserAction = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params?.id, 10);
    const user = await readUserService(id);

    return res.status(200).json({ user });
});

// // @desc    Update user
// // @route   PUT /user/:id
// // @access  Public
const updateUserAction = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params?.id, 10);
    const body: User = req.body;
    const user = await updateUserService(id, body);

    return res.status(201).json({ user });
});


// // @desc    Delete user
// // @route   DELETE /users/:id
// // @access  Public
const deleteUserAction = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params?.id, 10);
    await deleteUserService(id);

    return res.status(204).json("User has been successfully deleted");
});

export { createUserAction, readUsersAction, readUserAction, updateUserAction, deleteUserAction };