import React, { Component } from 'react';
import noDataImage from '../../assets/no-data-found.png';

import "./styles.scss";

class ProductsNotFound extends Component {
    render() {
        return (
            <div className="no-products">
                <img src={noDataImage} className="no-products__image" alt="No products found." />
                <h3 className="no-products__text">Oops...there are no products available at the moment.</h3>
                <button onClick={() => window.location.reload()} className="no-products__btn">TRY AGAIN</button>
            </div>
        )
    }
}

export default ProductsNotFound