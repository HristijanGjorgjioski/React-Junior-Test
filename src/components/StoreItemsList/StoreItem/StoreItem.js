import react from "react";
import { getProductPrettifiedPrice } from "helpers/currencyHelpers";
import { PriceFormatContext } from "helpers/contexts";
import "./StoreItem.css";
import { ReactComponent as CartSvg } from "assets/Cart.svg";

class StoreItem extends react.Component {
  getProductImage() {
    const item = this.props.item;

    let firstImage = "";
    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
      firstImage = item.gallery[0];
    }

    return firstImage;
  }

  render() {
    const item = this.props.item;
    const outOfStockClass = item.inStock ? "" : " StoreItem--OutOfStock";

    return (
      <article className={"StoreItem" + outOfStockClass}>
        <div className="StoreItem__Presentation">
          <div className="StoreItem__ImageWrapper">
            <img className="StoreItem__Image" alt="The product" src={this.getProductImage()} />
          </div>
          <span className="StoreItem__Cart">
            <CartSvg />
          </span>
        </div>
        <div className="StoreItem__Description">
          <a
            className="StoreItem__Link"
            href={item.name}
            onClick={(e) => {
              this.props.handleChangePage(e, item.name);
            }}
          >
            <h2 className="StoreItem__Name">{item.name}</h2>
          </a>
          <PriceFormatContext.Consumer>
            {(currency) => <div className="StoreItem__Price">{getProductPrettifiedPrice(item, currency.currency)}</div>}
          </PriceFormatContext.Consumer>
        </div>
      </article>
    );
  }
}
export default StoreItem;
