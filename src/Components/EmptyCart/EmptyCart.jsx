import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iconEmptyCart from "../../assets/icon-empty-cart.png";

class EmptyCart extends Component {
    render() {
        return (
            <div className="no-products">
                <img src={iconEmptyCart} className="no-products__image" alt="No products found." />
                <h3 className="no-products__text">Oops...Your cart is empty.</h3>
                <Link to="/" className="no-products__btn">FIND PRODUCTS</Link>
            </div>
        )
    }
}

export default EmptyCart
