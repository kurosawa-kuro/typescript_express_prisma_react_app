import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import Auth from "../components/Auth";
import User from "../components/User";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import userReducer from "../features/userSlice";
import MainPage from "../components/MainPage";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

const handlers = [
    rest.get(`/auth/profile`, (req, res, ctx) => {
        const user = { name: "abc123", email: "abc123", token: "abc123" }
        return res(ctx.status(200), ctx.json({ user }));
        // return res(ctx.status(200), ctx.json({ id: 1, name: "test user" }));
    }),
    rest.get("/users", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ users: [{ name: "abc1234", email: "abc1234", token: "abc1234" }] }));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
afterAll(() => {
    server.close();
});

describe("MainPage Component Test Cases", () => {
    let store: ToolkitStore;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
                user: userReducer,
            },
        });
    });
    it("1 :Should render all the elements correctly", async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>
        );
        // screen.debug();
        expect(screen.getByTestId("span-title")).toBeTruthy();
        expect(screen.getByTestId("btn-logout")).toBeTruthy();
    });
    it("3 :Should render logged in user name", async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>
        );
        expect(screen.queryByText("abc123")).toBeNull();
        expect(await screen.findByText("abc123")).toBeInTheDocument();


    });
})