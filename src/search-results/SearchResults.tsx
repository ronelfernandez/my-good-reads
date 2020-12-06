import React from "react";
import "./SearchResults.scss";

type SearchResultsProps = {
    allAvailableBooks: any[];
    addToWishList: (book: any) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
    allAvailableBooks,
    addToWishList,
}) => {
    return (
        <ul>
            {allAvailableBooks.map(
                ({
                    id,
                    volumeInfo: {
                        title,
                        description,
                        imageLinks: { smallThumbnail },
                        authors,
                        publisher,
                        publishedDate,
                    },
                }) => (
                    <li className="book" key={id}>
                        <div className="image-action">
                            <img
                                src={smallThumbnail}
                                alt={title}
                                className="book-image"
                            />
                            <button onClick={() => addToWishList(title)}>
                                Add to Wishlist
                            </button>
                        </div>
                        <div className="book-info">
                            <div className="book-title">{title}</div>
                            <div className="book-authors-container">
                                by{" "}
                                {authors && authors.map(
                                    (author: string, index: number) => (
                                        <React.Fragment key={author}>
                                            {index > 0 ? " and " : " "}
                                            <span className="book-author">
                                                {author}
                                            </span>
                                        </React.Fragment>
                                    )
                                )}{" "}
                                |{" "}
                                {new Date(publishedDate).toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </div>
                            <div className="book-publisher">{publisher}</div>

                            <div className="book-description">
                                {description}
                            </div>
                        </div>
                    </li>
                )
            )}
        </ul>
    );
};

export default SearchResults;
