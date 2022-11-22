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

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

const handlers = [
    rest.post(`/auth/login`, (req, res, ctx) => {
        const user = { name: "abc123", email: "abc123", token: "abc123" }
        return res(ctx.status(200), ctx.json({ user }));
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

describe("Auth Component Test Cases", () => {
    let store: ToolkitStore;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
        });
    });
    it("1 :Should render all the elements correctly", async () => {
        render(
            <Provider store={store}>
                <Auth />
            </Provider>
        );
        // screen.debug();
        expect(screen.getByTestId("label-email")).toBeTruthy();
        expect(screen.getByTestId("label-password")).toBeTruthy();
        expect(screen.getByTestId("input-email")).toBeTruthy();
        expect(screen.getByTestId("input-password")).toBeTruthy();
        // expect(screen.getByRole("button")).toBeTruthy();
        // expect(screen.getByTestId("toggle-icon")).toBeTruthy();
    });
    it("3 :Should route to MainPage when login is successful", async () => {
        render(
            <Provider store={store}>
                <Auth />
            </Provider>
        );
        userEvent.click(screen.getByText("Login"));
        expect(
            await screen.findByText("Successfully logged in!")
        ).toBeInTheDocument();
        expect(mockHistoryPush).toBeCalledWith("/main");
        expect(mockHistoryPush).toHaveBeenCalledTimes(1);
        // screen.debug();



    });
})