import "@testing-library/jest-dom";
// import testing utilities
import { fireEvent, render, getByText } from "@testing-library/react";
import * as React from "react";
import SearchResults from "../search-results/SearchResults";

const addToWishList = jest.fn();

const mockBooks = {
    items: [
        {
            id: "a",
            volumeInfo: {
                title: "Title 1",
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

const mockWishList = [
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
];

test("search results should be populated with data passed to it", async () => {
    const { container } = render(
        <SearchResults
            allAvailableBooks={mockBooks.items}
            addToWishList={addToWishList}
            wishList={[]}
            searchByAuthor={(author) => {}}
        />
    );
    const bookItems = await container.querySelectorAll(
        ".search-results-list li"
    );
    expect(bookItems).toHaveLength(mockBooks.items.length);

    const button = await container.querySelector(
        ".search-results-list li button"
    );

    fireEvent.click(button);

    expect(addToWishList).toHaveBeenCalled();
});

test("item title passed should be present", async () => {
    render(
        <SearchResults
            allAvailableBooks={mockBooks.items}
            addToWishList={addToWishList}
            wishList={[]}
            searchByAuthor={(author) => {}}
        />
    );
    await getByText(mockBooks.items[0].volumeInfo.title)
});
