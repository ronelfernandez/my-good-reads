import React from "react";
import "./SearchResults.scss";

type SearchResultsProps = {
    allAvailableBooks: any[];
    addToWishList: (book: any) => void;
    searchByAuthor: (author: string) => void;
    wishList: any[];
};

const SearchResults: React.FC<SearchResultsProps> = ({
    allAvailableBooks,
    addToWishList,
    wishList,
    searchByAuthor,
}) => {
    const Title = ({ title }: { title: string }) => (
        <div className="book-title">{title}</div>
    );
    const ImageAction = ({
        imageLinks,
        title,
        book,
    }: {
        imageLinks: any;
        title: string;
        book: any;
    }) => {
        const inWishList = wishList.some((w) => w.id === book.id);
        return (
            <div className="image-action">
                <img
                    src={imageLinks?.smallThumbnail}
                    alt={title}
                    className="book-image"
                />
                <button
                    onClick={() => addToWishList(book)}
                    disabled={inWishList}
                    className="button-link button-add-to-wishlist"
                >
                    + Add to Wishlist
                </button>
            </div>
        );
    };

    const Authors = ({ authors }: { authors: string[] }) => {
        return (
            <>
                by
                {authors &&
                    authors.map((author: string, index: number) => (
                        <React.Fragment key={author}>
                            {index > 0 ? "and" : ""}
                            <button
                                className="button-link button-search-by-author "
                                onClick={() => searchByAuthor(author)}
                            >
                                <span className="book-author">{author}</span>
                            </button>
                        </React.Fragment>
                    ))}{" "}
            </>
        );
    };
    const PublishedDate = ({ publishedDate }: { publishedDate: any }) => (
        <>
            {' ' + new Date(publishedDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })}
        </>
    );
    const Publisher = ({ publisher }: { publisher: string }) => (
        <div className="book-publisher">{publisher}</div>
    );

    const Description = ({ description }: { description: string }) => (
        <div className="book-description">{description}</div>
    );

    return (
        <ul className="search-results-list">
            {allAvailableBooks.map(
                (
                    {
                        id,
                        volumeInfo: {
                            title,
                            description,
                            imageLinks,
                            authors,
                            publisher,
                            publishedDate,
                        },
                    },
                    index
                ) => (
                    <li className="book" key={id}>
                        <ImageAction
                            imageLinks={imageLinks}
                            title={title}
                            book={allAvailableBooks[index]}
                        />
                        <div className="book-info">
                            <Title title={title} />
                            <div className="book-authors-container">
                                <Authors authors={authors} />|
                                <PublishedDate publishedDate={publishedDate} />
                            </div>
                            <Publisher publisher={publisher} />
                            <Description description={description} />
                        </div>
                    </li>
                )
            )}
        </ul>
    );
};

export default SearchResults;
