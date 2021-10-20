import react from "react";
import { CartContext, PriceFormatContext } from "helpers/contexts";
import { calculateCartTotal } from "helpers/currencyHelpers";
import CartPageItem from "./CartPageItem/CartPageItem";
import "./CartPage.css";

class CartPage extends react.Component {
  render() {
    const items = this.props.cartContext.cart.map((item) => <CartPageItem key={item.id} item={item} />);

    return (
      <div className="Container">
        <div className="CartPage">
          <div className="CartPage__TitleWrapper">
            <h1 className="CartPage__Title">Cart</h1>
          </div>
          <div className="CartPage__ListWrapper">{items}</div>
          <div className="CartPage__TotalWrapper">
            <div className="CartPage__TotalText">Total:</div>
            <div className="CartPage__TotalAmount">
              {calculateCartTotal(this.props.cartContext.cart, this.props.currency)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CartPageWithContext extends react.Component {
  render() {
    return (
      <CartContext.Consumer>
        {(cartContext) => (
          <PriceFormatContext.Consumer>
            {(currencyContext) => (
              <CartPage {...this.props} cartContext={cartContext} currency={currencyContext.currency} />
            )}
          </PriceFormatContext.Consumer>
        )}
      </CartContext.Consumer>
    );
  }
}

export default CartPageWithContext;
