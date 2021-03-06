import React, { useEffect, useState, useCallback, useRef } from "react";
import { getBooksByType } from "./book-search.service";
import SearchResults from "../search-results/SearchResults";
import "./BookSearch.scss";
import WishList from "../wish-list/WishList";
import _ from "lodash";

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState([]);

    const [wishList, setWishList] = useState<any[]>([]);
    const ref: any = useRef(null);

    const requestBooks = useCallback(async () => {
        if (bookTypeToSearch) {
            const allBooks = await getBooksByType(bookTypeToSearch);
            setAllAvailableBooks(
                allBooks && allBooks.items ? allBooks.items : []
            );
        } else {
            setAllAvailableBooks([]);
        }
    }, [bookTypeToSearch, setAllAvailableBooks]);

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [requestBooks, bookTypeToSearch]);

    useEffect(() => {
        if (ref && ref.current) {
            ref!.current!.focus();
        }
    }, []);

    const onSearchChange = useCallback((value) => {
        updateBookTypeToSearch(value);
    }, []);

    const onSearchChangeD = useCallback(_.debounce(onSearchChange, 500), [
        onSearchChange,
    ]);

    return (
        <div className="book--layout-main">
            <div className="book--container">
                <div className="search-params">
                    <div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateBookTypeToSearch(bookType);
                            }}
                        >
                            <label>
                                <span className="input-instructions">
                                    Search Books
                                </span>
                                <input
                                    ref={ref}
                                    className="full-width input-search"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    onChange={(e) => {
                                        updateBookType(e.target.value);
                                        onSearchChangeD(e.target.value);
                                    }}
                                    aria-describedby="search-instructions"
                                />
                            </label>
                            <span id="search-instructions">
                                Search for books to add to your reading list
                            </span>
                        </form>
                        {!bookType && (
                            <div className="empty">
                                <p>
                                    Try searching for a topic, for example
                                    <button
                                        className="button-link button-link-sample-text"
                                        onClick={() => {
                                            updateBookType("Javascript");
                                            updateBookTypeToSearch(
                                                "Javascript"
                                            );
                                        }}
                                    >
                                        "Javascript"
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <SearchResults
                    allAvailableBooks={allAvailableBooks}
                    wishList={wishList}
                    addToWishList={(book) => {
                        if (!wishList.find((t) => t.id === book.id)) {
                            setWishList([...wishList, book]);
                        }
                    }}
                    searchByAuthor={(author: string) => {
                        updateBookType(author);
                        updateBookTypeToSearch(author);
                    }}
                />
            </div>
            <WishList
                wishList={wishList}
                removeBook={(id) => {
                    setWishList(wishList.filter((book) => book.id !== id));
                }}
            />
        </div>
    );
};

export default BookSearch;
