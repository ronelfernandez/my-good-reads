import "@testing-library/jest-dom";
// import testing utilities
import * as React from "react";
import WishList from "./WishList";
import { render, fireEvent } from "@testing-library/react";

const removeBook = jest.fn();

const mockWishList = [
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
];

test("wish list should be populated with data passed to it", async () => {
    const { container } = render(
        <WishList wishList={mockWishList} removeBook={removeBook} />
    );
    const wishListItems = await container.querySelectorAll(".wish-list-item");
    expect(wishListItems).toHaveLength(mockWishList.length);
});

test("book info passed should be present", async () => {
    const { container } = render(
        <WishList wishList={mockWishList} removeBook={removeBook} />
    );

    expect(container.querySelector(".wish-list-title")).toHaveTextContent(
        mockWishList[0].volumeInfo.title
    );

    expect(container.querySelector(".wish-list-date")).toHaveTextContent('Jan 1, 2021');
});


test("buttons should call passed functions", async () => {
    const { container } = render(
        <WishList wishList={mockWishList} removeBook={removeBook} />
    );
    const removeBookButton = await container.querySelector(
        ".wish-list-item button"
    );

    fireEvent.click(removeBookButton);

    expect(removeBook).toHaveBeenCalled();
});