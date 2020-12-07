import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import BookSearch from "./BookSearch";
import SearchResults from "../search-results/SearchResults";

const fakeSearchResponse = {
    items: [
        {
            id: "a",
            volumeInfo: {
                title: "a",
                description: "a",
                imageLinks: [],
                authors: ["a"],
                publisher: ["a"],
                publishedDate: "1/1/2021",
            },
        },
        {
            id: "b",
            volumeInfo: {
                title: "b",
                description: "b",
                imageLinks: [],
                authors: ["b"],
                publisher: ["b"],
                publishedDate: "1/1/2021",
            },
        },
    ],
};
const server = setupServer(
    rest.get("https://www.googleapis.com/books/v1/volumes", (req, res, ctx) => {
        return res(ctx.json(fakeSearchResponse));
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

test("input should be populated with sample search text when button is clicked", async () => {
    const { container } = render(<BookSearch />);

    expect(container.querySelector(".empty")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Javascript/i));

    const inputSearch = await container.querySelector(".input-search");
    expect(inputSearch.value).toBe("Javascript");
    expect(container.querySelector(".empty")).not.toBeInTheDocument();
});
