import React from 'react';

import "./ProductCard.css"

interface ProductCardProps {
    image:string;
    title:string;
    price:number;
    brand:string;
}
const ProductCard: React.FC<ProductCardProps>= (props) => {
    const { image, title, price, brand } = props;
    return (
        <div className="card-container">
            <div className="product-image">
                <span className="brand-name">{brand}</span>

                <img src={image} alt={title} />
            </div>
            <div className="title-image">
                <span className="">{title}</span>
                <span className="price">${price}</span>

            </div>


        </div>
    )

}
export default ProductCard;