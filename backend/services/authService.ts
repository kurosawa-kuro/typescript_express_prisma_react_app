import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken')
import { db } from "../utils/db";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    token?: string;
};

const registerUserService = async (
    user: Omit<User, "id">
): Promise<Omit<User, "password">> => {
    const { name, email, password } = user;
    console.log({ user })
    const foundUserWithEmail = await db.user.findUnique({
        where: {
            email,
        },
    })

    if (foundUserWithEmail) {
        throw new Error('user already exists');
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const registerUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        },
    });

    return {
        id: registerUser.id,
        name: registerUser.name,
        email: registerUser.email,
        token: generateToken(registerUser.id)
    } as Omit<User, "password">
};

const loginUserService = async (
    user: Omit<User, "id" | "name">
): Promise<Omit<User, "password"> | undefined> => {
    const { email, password } = user;

    const foundUserWithEmail = await db.user.findUnique({
        where: { email },
    })

    if (!foundUserWithEmail) {
        throw new Error("user not found");
    }

    const isValidUser = await bcrypt.compare(password, foundUserWithEmail.password)

    if (!isValidUser) {
        throw new Error("invalid credintial data");
    }

    return {
        id: foundUserWithEmail.id,
        name: foundUserWithEmail.name,
        email: foundUserWithEmail.email,
        token: generateToken(foundUserWithEmail.id)
    } as Omit<User, "password">
};

const generateToken = (id: number) => {
    return jwt.sign({ id }, "process.env.JWT_SECRET", {
        expiresIn: '30d',
    })
}


export { registerUserService, loginUserService };