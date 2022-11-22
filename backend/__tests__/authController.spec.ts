import supertest from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../app";
import resetDatabase from "../utils/resetDatabase";
import { login, register } from '../testUtils/authUtil'

const prisma = new PrismaClient();

describe("authController test", () => {
    beforeEach(async () => {
        await resetDatabase();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    const registerUser = {
        name: 'aaaa',
        email: 'aaaa@email.com',
        password: 'aaaa'
    }

    const loginUser = {
        email: 'aaaa@email.com',
        password: 'aaaa'
    }

    describe("POST /auth/register", () => {
        test("response with success", async () => {
            const res = await supertest(app).post("/auth/register").send(registerUser);
            const users = await prisma.user.findMany();

            expect(res.status).toBe(201);
            expect(users.length).toBe(1);
            expect(res.body.user.name).toEqual(registerUser.name);
            expect(res.body.user.email).toEqual(registerUser.email);
            expect(res.body.user.token).toBeDefined()
        });
    });

    describe("POST /auth/login", () => {
        test("response with success", async () => {
            await supertest(app).post("/auth/register").send(registerUser);

            const res = await supertest(app).post("/auth/login")
                .send(loginUser);

            expect(res.status).toBe(201);
            expect(res.body.user.name).toEqual(registerUser.name);
            expect(res.body.user.email).toEqual(loginUser.email);
            expect(res.body.user.token).toBeDefined()
        });
    });

    describe("Token", () => {
        test("Token check", async () => {
            await register(registerUser)
            const token = await login(loginUser)

            const res = await supertest(app)
                .get("/users")
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
        });
    });
});
