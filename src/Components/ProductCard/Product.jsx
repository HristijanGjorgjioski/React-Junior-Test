import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

import "./styles.scss";

class ProductCard extends Component {

  productPrice = () => {
    const productPrice = this.props.product.prices.find(price => price.currency === this.props.currency.selectedCurrency);
    return `${productPrice.currency} ${productPrice.amount}`;
  }

  render() {
    const { product } = this.props;
    return (
      <div to={`/product/${product.id}`} className="product-card">
        <div className="product-card__image">
          <img src={product.gallery[0]} alt="product" />
          {!product.inStock && (
            <div className="product-card__image--out-of-stock">
              <h3>OUT OF STOCK</h3>
            </div>
          )}
          {product.inStock && (
            <Link
              to={`/product/${product.id}`}
              className="product-card__btn"
            >
              <span className="material-font material-icons-outlined">
                shopping_cart
              </span>
            </Link>
          )}
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <h3 className="product-card__price">{this.productPrice()}</h3>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currency: state.shop.currency,
  };
};

export default connect(mapStateToProps)(ProductCard);