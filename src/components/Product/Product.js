import react from "react";
import StoreApolloClient, { ALL_PRODUCTS } from "graphql/GraphQLQueries";
import { PriceFormatContext, CartContext, SiteNotificationsContext } from "helpers/contexts";
import { prettifyPrice } from "helpers/currencyHelpers";
import ProductAttribute from "components/ProductAttribute/ProductAttribute";
import "./Product.css";

import ImageGallery from "react-image-gallery";

class Product extends react.Component {
  constructor(props) {
    super(props);

    this.product = {};

    this.state = {
      loading: true,
    };

    this.getProductImages = this.getProductImages.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.handleAttrItemClick = this.handleAttrItemClick.bind(this);
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.getAttributeObject = this.getAttributeObject.bind(this);
    this.descriptionHasManyWords = this.descriptionHasManyWords.bind(this);
  }

  componentDidMount() {
    StoreApolloClient.query({ query: ALL_PRODUCTS }).then((result) => {
      this.product = result.data.category.products.find((product) => product.name === this.props.name);
      const newState = { loading: false };

      // Set default product attributes into state.
      this.product.attributes.forEach((attr) => {
        let firstSelected = "";
        if (attr.items.length > 0) {
          firstSelected = attr.items[0].id;
        }

        newState[attr.id] = firstSelected;
      });

      this.setState(newState);
    });
  }

  getProductImages() {
    return this.product.gallery.map((imageURL) => {
      return { original: imageURL, thumbnail: imageURL };
    });
  }

  getPrice() {
    const product = this.product;
    const priceAndCurrency = product.prices.find((price) => {
      return price.currency === this.props.currencyContext;
    });

    return prettifyPrice(priceAndCurrency.amount, this.props.currencyContext);
  }

  handleAttrItemClick(e, attrId) {
    this.setState({ [attrId]: e.currentTarget.value });
  }

  handleAddItemToCart() {
    this.props.addItemToCart(this.product, this.getAttributeObject());
    this.props.siteNotifications.showAddToCartNotification();
  }

  getAttributeObject() {
    const attrObject = {};
    this.product.attributes.forEach((attr) => {
      attrObject[attr.id] = this.state[attr.id];
    });

    return attrObject;
  }

  descriptionHasManyWords() {
    const descriptionLength = this.product.description.split(" ").filter((word) => word !== "").length;
    if (descriptionLength > 70) {
      return true;
    }

    return false;
  }

  render() {
    if (this.state.loading) {
      return <div className="Product--Loading"></div>;
    }

    const product = this.product;
    const productDescription = (
      <div className="Product__Description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
    );

    const addToCartText = product.inStock ? "Add to cart" : "Out of stock";

    const attributes = product.attributes.map((attr) => {
      return (
        <ProductAttribute
          bemBaseClass="ProductAttribute"
          key={attr.id}
          attribute={attr}
          selected={this.state[attr.id]}
          handleItemClick={(e) => {
            this.handleAttrItemClick(e, attr.id);
          }}
        />
      );
    });

    return (
      <article className="Product Container">
        <div className="Product__GalleryWrapper">
          <ImageGallery items={this.getProductImages()} thumbnailPosition="left" showPlayButton={false} />
        </div>

        <div className="Product__Info">
          <h1 className="Product__Title">{product.name}</h1>
          {this.descriptionHasManyWords() ? "" : productDescription}

          <div className="Product__VariantSelector">
            {attributes}
            <div className="Product__PriceWrapper">
              <span className="Product__PriceTitle">Price:</span>
              <span className="Product__PriceAmount">{this.getPrice()}</span>
            </div>

            <div className="Product__ButtonWrapper">
              <button className="Product_AddToCartBtn Btn Btn--Success" onClick={this.handleAddItemToCart}>
                {addToCartText}
              </button>
            </div>
          </div>

          {this.descriptionHasManyWords() ? (
            <>
              <span className="Product__DescriptionTitle">Description:</span>
              {productDescription}
            </>
          ) : (
            ""
          )}
        </div>
      </article>
    );
  }
}

class ProductWithContext extends react.Component {
  render() {
    return (
      <CartContext.Consumer>
        {(cartContext) => (
          <PriceFormatContext.Consumer>
            {(currencyContext) => (
              <SiteNotificationsContext.Consumer>
                {(siteNotifications) => (
                  <Product
                    {...this.props}
                    addItemToCart={cartContext.addItemToCart}
                    currencyContext={currencyContext.currency}
                    siteNotifications={siteNotifications}
                  />
                )}
              </SiteNotificationsContext.Consumer>
            )}
          </PriceFormatContext.Consumer>
        )}
      </CartContext.Consumer>
    );
  }
}

export default ProductWithContext;
