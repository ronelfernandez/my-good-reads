import React from "react";
import "./WishList.scss";

type WishListProps = {
    wishList: string[];
    removeBook: (title: string) => void;
};

const WishList: React.FC<WishListProps> = ({ wishList, removeBook }) => {
    return (
        <div className="wish-list--container">
            <div className="wish-list-header">
                My Reading Wishist ({wishList.length})
            </div>
            <ul>
                {wishList.map((title) => (
                    <li className="wish-list-item" key={title}>
                        <span className="wish-list-title">{title}</span>
                        <button onClick={() => removeBook(title)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WishList;
