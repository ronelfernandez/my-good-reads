import React from "react";
import "./WishList.scss";

type WishListProps = {
    wishList: any[];
    removeBook: (title: string) => void;
};

const WishList: React.FC<WishListProps> = ({ wishList, removeBook }) => {
    return (
        <div className="wish-list--container">
            <div className="wish-list-header">
                My Reading Wishist ({wishList.length})
            </div>
            <ul>
                {wishList.map(
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
                        <li className="wish-list-item" key={title}>
                            <div className="wish-list-title">
                                {title}
                                <div className="wish-list-date">
                                    {new Date(publishedDate).toLocaleDateString(
                                        "en-US",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => removeBook(id)}
                                className="button-link"
                            >
                                <i className="material-icons">clear</i>
                            </button>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default WishList;
