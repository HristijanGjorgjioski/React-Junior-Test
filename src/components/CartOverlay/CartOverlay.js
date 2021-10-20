import react from "react";
import { CartContext } from "helpers/contexts";
import "./CartOverlay.css";

class CartOverlay extends react.Component {
  render() {
    return (
      <CartContext.Consumer>
        {(cartContext) => {
          const additionalClass = cartContext.miniCartOpen ? " CartOverlay__MiniCartOpen" : "";
          return <div className={"CartOverlay" + additionalClass}>{this.props.children}</div>;
        }}
      </CartContext.Consumer>
    );
  }
}

export default CartOverlay;
