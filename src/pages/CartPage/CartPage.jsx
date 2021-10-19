import React, { Component } from "react";
import { connect } from "react-redux";

import EmptyCart from '../../Components/EmptyCart/EmptyCart';
import FullCartProductTile from '../../Components/FullCartProductTile/FullCartProductTile';
import "./styles.scss";

class CartPage extends Component {

  getCartTotal = () => {
    const currency = this.props.currency.selectedCurrency;
    const totalAmount = this.props.cart.products.reduce((total, product) => {
      const qty = product.qty;
      const productPrice = product.prices.find(
        (price) => price.currency === currency
      );
      return total + productPrice.amount * qty;
    }, 0);

    return `${currency} ${totalAmount.toFixed(2)}`;
  };

  render() {
    const { cart } = this.props;

    if (cart.products.length === 0) return <EmptyCart />;

    return (
      <section className="cart-page">
        <h2 className="cart-page__title">Cart</h2>
        {cart.products.map((product) => {
          return <FullCartProductTile key={product.id} product={product} />;
        })}
        <div className="cart-page__total">
          <button className="cart-page__checkout cart-page__checkout--btn">
            CHECKOUT
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currency: state.shop.currency,
  };
};

export default connect(mapStateToProps)(CartPage);
