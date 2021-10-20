import react from "react";
import { PriceFormatContext, CartContext } from "helpers/contexts";

class Cart extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      currency: "USD",
      miniCartOpen: false,
    };

    this.changeCurrency = this.changeCurrency.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.productIsInCart = this.productIsInCart.bind(this);
    this.createCartProductUniqueId = this.createCartProductUniqueId.bind(this);
    this.getCartItem = this.getCartItem.bind(this);
    this.modifyItemAmount = this.modifyItemAmount.bind(this);
    this.changeMiniCartVisibility = this.changeMiniCartVisibility.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
  }

  changeCurrency(e) {
    this.setState({ currency: e.target.value });
  }

  changeMiniCartVisibility(e, value) {
    if (value === undefined || value === null) {
      this.setState((prevState) => {
        return { miniCartOpen: !prevState.miniCartOpen };
      });
    }

    if (value === false || value === true) {
      this.setState({ miniCartOpen: value });
    }
  }

  getCartItems() {
    return this.state.cart.length;
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          addItemToCart: this.addItemToCart,
          modifyItemAmount: this.modifyItemAmount,
          changeMiniCartVisibility: this.changeMiniCartVisibility,
          miniCartOpen: this.state.miniCartOpen,
          getCartItems: this.getCartItems,
        }}
      >
        <PriceFormatContext.Provider value={{ currency: this.state.currency, changeCurrency: this.changeCurrency }}>
          <>{this.props.children}</>
        </PriceFormatContext.Provider>
      </CartContext.Provider>
    );
  }

  /**
   * Add a new item to cart. If the item already exists, the amount is not
   * increased.
   */
  addItemToCart(product, attributes) {
    if (!product.inStock) {
      return;
    }

    if (this.productIsInCart(product, attributes)) {
      this.modifyItemAmount(product, attributes, 1);
      return;
    }

    this.setState((prevState) => {
      const newProduct = {
        id: this.createCartProductUniqueId(product, attributes),
        product: product,
        attributes: attributes,
        amount: 1,
      };

      return { cart: [...prevState.cart, newProduct] };
    });
  }

  /**
   * Modify the item amount. The amount can be an int to set the new relative
   * amount. For example, 1 will increase the amount with 1. -1 will decrease
   * the amount with 1.
   */
  modifyItemAmount(product, attributes, amount) {
    // this.setState({ cart: cartStateItem });

    this.setState((prevState) => {
      const newItemUniqueId = this.createCartProductUniqueId(product, attributes);
      const cartStateItem = prevState.cart.map((item) => {
        const newItem = Object.assign({}, item);
        if (newItem.id === newItemUniqueId) {
          if (typeof amount == "number") {
            const newAmount = newItem.amount + amount;
            if (newAmount >= 0) {
              newItem.amount = newAmount;
            }
          }

          return newItem;
        } else {
          return newItem;
        }
      });

      return { cart: cartStateItem };
    });
  }

  /**
   * Check if the same product, with the same attributes, is already in cart.
   */
  productIsInCart(product, attributes) {
    const newItemUniqueId = this.createCartProductUniqueId(product, attributes);
    const equalItem = this.state.cart.find((item) => {
      return item.id === newItemUniqueId;
    });

    return equalItem ? true : false;
  }

  getCartItem(product, attributes) {
    const newItemUniqueId = this.createCartProductUniqueId(product, attributes);
    const foundItem = this.state.cart.find((item) => {
      return item.id === newItemUniqueId;
    });

    return foundItem;
  }

  /**
   * Create a cart uniqueID, based on the product name and the attributes.
   */
  createCartProductUniqueId(product, attributes) {
    let uniqueId = product.name;

    for (const attrID in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, attrID)) {
        uniqueId = uniqueId + "-" + attributes[attrID];
      }
    }

    return uniqueId;
  }
}

export default Cart;
