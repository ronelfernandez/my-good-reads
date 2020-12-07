import React from "react";
import "./WishList.scss";

type WishListProps = {
    wishList: any[];
    removeBook: (title: string) => void;
};

const WishList: React.FC<WishListProps> = ({ wishList, removeBook }) => {
    return (
        <aside className="wish-list--container">
            <h3 className="wish-list-header">
                My Reading Wishlist ({wishList.length})
            </h3>
            <ul>
                {wishList.map(
                    ({
                        id,
                        volumeInfo: {
                            title,
                            publishedDate,
                        },
                    }) => (
                        <li className="wish-list-item" key={title}>
                            <div className="wish-list-info">
                                <span className="wish-list-title">{title}</span>
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
        </aside>
    );
};

export default WishList;
