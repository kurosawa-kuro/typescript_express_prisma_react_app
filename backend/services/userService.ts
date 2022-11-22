import { db } from "../utils/db";

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
};

const createUserService = async (
    user: Omit<User, "id">
): Promise<User> => {
    const { name, email, password } = user;
    return db.user.create({
        data: {
            name,
            email,
            password: password || "",
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });
};

const readUsersService = async (): Promise<Omit<User, "password">[]> => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        },
    });
};

const readUserService = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
    });
};

const updateUserService = async (
    id: number,
    user: Omit<User, "id">

): Promise<Omit<User, "password">> => {
    const { name, email } = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            name,
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

const deleteUserService = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        },
    });
};

export { createUserService, readUsersService, readUserService, updateUserService, deleteUserService };