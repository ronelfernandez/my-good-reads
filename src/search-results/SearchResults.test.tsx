import "@testing-library/jest-dom";
// import testing utilities
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import SearchResults from "../search-results/SearchResults";

const addToWishList = jest.fn();
const searchByAuthor = jest.fn();

const mockBooks = {
    items: [
        {
            id: "a",
            volumeInfo: {
                title: "Title 1",
                description: "a",
                imageLinks: [],
                authors: ["Very Good Author"],
                publisher: "a",
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
                publisher: "b",
                publishedDate: "1/1/2021",
            },
        },
    ],
};

const mockWishList = [
    {
        id: "a",
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
            searchByAuthor={searchByAuthor}
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

test("book info passed should be present", async () => {
    const { container } = render(
        <SearchResults
            allAvailableBooks={mockBooks.items}
            addToWishList={addToWishList}
            wishList={[]}
            searchByAuthor={searchByAuthor}
        />
    );

    expect(container.querySelector(".book-title")).toHaveTextContent(
        mockBooks.items[0].volumeInfo.title
    );

    expect(container.querySelector(".book-publisher")).toHaveTextContent(
        mockBooks.items[0].volumeInfo.publisher
    );

    expect(container.querySelector(".book-description")).toHaveTextContent(
        mockBooks.items[0].volumeInfo.description
    );

    expect(container.querySelector(".book-author")).toHaveTextContent(
        mockBooks.items[0].volumeInfo.authors[0]
    );
});

test("add to wishlist button should be disabled when in wishlist", async () => {
    const { container } = render(
        <SearchResults
            allAvailableBooks={mockBooks.items}
            addToWishList={addToWishList}
            wishList={mockWishList}
            searchByAuthor={searchByAuthor}
        />
    );
    expect(container.querySelector("li button")).toHaveAttribute(
        "disabled",
        ""
    );
});

test("add to wishlist button should bnot e disabled when not in wishlist", async () => {
    const { container } = render(
        <SearchResults
            allAvailableBooks={mockBooks.items}
            addToWishList={addToWishList}
            wishList={mockWishList}
            searchByAuthor={searchByAuthor}
        />
    );
    expect(container.querySelectorAll("li button")[1]).not.toHaveAttribute(
        "disabled"
    );
});

test("buttons should call passed functions", async () => {
    const { container } = render(
        <SearchResults
            allAvailableBooks={mockBooks.items}
            addToWishList={addToWishList}
            wishList={[]}
            searchByAuthor={searchByAuthor}
        />
    );
    const addToWishListButton = await container.querySelector(
        ".search-results-list li button"
    );

    fireEvent.click(addToWishListButton);

    expect(addToWishList).toHaveBeenCalled();

    const searchByAuthorButton = await container.querySelector(
        ".search-results-list li .button-search-by-author"
    );

    fireEvent.click(searchByAuthorButton);

    expect(searchByAuthor).toHaveBeenCalled();
});