import react from "react";
import { getProductPrettifiedPrice, calculateCartTotal } from "helpers/currencyHelpers";
import ProductAttribute from "components/ProductAttribute/ProductAttribute";
import "./NavbarCart.css";
import ScrollWrapper from "react-perfect-scrollbar";

class NavbarCart extends react.Component {
  constructor(props) {
    super(props);

    this.decreaseAmount = this.decreaseAmount.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.handleViewBagClick = this.handleViewBagClick.bind(this);
  }

  decreaseAmount(item) {
    this.props.cartContext.modifyItemAmount(item.product, item.attributes, -1);
  }

  increaseAmount(item) {
    this.props.cartContext.modifyItemAmount(item.product, item.attributes, 1);
  }

  handleViewBagClick(e) {
    this.props.handleChangePage(e);
    this.props.cartContext.changeMiniCartVisibility(e, false);
  }

  render() {
    const cartItems = this.props.cartContext.cart.map((item) => (
      <article key={item.id} className="NavbarCart__Item">
        <div className="NavbarCart__ItemInfo">
          <div className="NavbarCart__ItemName">{item.product.name}</div>

          <div className="NavbarCart__ItemPrice">{getProductPrettifiedPrice(item.product, this.props.currency)}</div>

          <div className="NavbarCart__ItemAttributes">
            {item.product.attributes.map((attr) => {
              return (
                <ProductAttribute
                  bemBaseClass="NavbarCartAttr"
                  disableInactive={true}
                  displayTitle={false}
                  key={attr.id}
                  attribute={attr}
                  selected={item.attributes[attr.id]}
                />
              );
            })}
          </div>
        </div>

        <div className="NavbarCart__ItemAmountSection">
          <button
            className="NavbarCart__AmountChangeBtn Btn"
            onClick={() => {
              this.increaseAmount(item);
            }}
          >
            +
          </button>
          <div className="NavbarCart__ItemAmount">{item.amount}</div>
          <button
            className="NavbarCart__AmountChangeBtn Btn"
            onClick={() => {
              this.decreaseAmount(item);
            }}
          >
            -
          </button>
        </div>

        <div className="NavbarCart__ItemImgWrapper">
          <img alt="Product presentation" src={item.product.gallery[0]} />
        </div>
      </article>
    ));

    const additionalHiddenClass = this.props.isOpen ? "" : " NavbarCart--Hidden";

    const singularOrPluralItems = this.props.cartContext.cart.length === 1 ? "item" : "items";
    const titleDescription = ", " + this.props.cartContext.cart.length + " " + singularOrPluralItems;

    return (
      <div className={"NavbarCart" + additionalHiddenClass} tabIndex="0">
        <ScrollWrapper className="NavbarCart__ItemsScrollWrapper" options={{ wheelPropagation: false }}>
          <div className="NavbarCart__TitleWrapper">
            <span className="NavbarCart__Title">My Bag</span>
            <span className="NavbarCart__TitleAdditionalDescription">{titleDescription}</span>
          </div>
          <div className="NavbarCart__ItemsWrapper">{cartItems}</div>

          <div className="NavbarCart__Total">
            <div className="NavbarCart__TotalText">Total</div>
            <div className="NavbarCart__TotalAmount">
              {calculateCartTotal(this.props.cartContext.cart, this.props.currency)}
            </div>
          </div>

          <div className="NavbarCart__BtnWrapper">
            <button className="Btn" onClick={this.handleViewBagClick} value="cart">
              View Bag
            </button>
            <button className="Btn Btn--Success">Checkout</button>
          </div>
        </ScrollWrapper>
      </div>
    );
  }
}

export default NavbarCart;
