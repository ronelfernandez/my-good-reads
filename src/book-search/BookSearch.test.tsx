import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { render, fireEvent, screen } from "@testing-library/react";
import BookSearch from "./BookSearch";

const fakeUserResponse = { token: "fake_user_token" };
const server = setupServer(
    rest.get(
        "https://www.googleapis.com/books/v1/volumes",
        (req, res, ctx) => {
            console.log("testdzzzz");
            return res(ctx.json(fakeUserResponse));
        }
    )
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

test("allows the user to login successfully", async () => {
    render(<BookSearch />);

    console.log("text");
    fireEvent.click(screen.getByText(/Javascript/i));
});
