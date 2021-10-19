import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import parse from "html-react-parser";
import { toast } from "react-toastify";

import { addToCart } from "../../actions/product";
import { Loader } from "../../Components";

import "./styles.scss";

class ProductPage extends Component {
  state = {
    product: null,
    selectedImage: null,
    attributes: null,
  };

  componentDidMount() {
    const product = this.props.products.find(
      (p) => p.id === this.props.match.params.id
    );
    this.setState({
      product: product,
      selectedImage: product.gallery[0],
      attributes: product.attributes,
    });
  }

  selectProductImage = (image) => {
    this.setState({
      selectedImage: image,
    });
  };

  selectProductAttribute = (attributeId, selectedValue) => {
    const updatedAttributes = this.state.attributes.map((att) => {
      if (att.id === attributeId) {
        return {
          ...att,
          selectedVal: selectedValue,
        };
      } else {
        return att;
      }
    });

    this.setState({
      attributes: updatedAttributes,
    });
  };

  showBannerNotification = (text, type) => {
    const toastOptions = {
      position: "top-right",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      closeOnClick: true,
      autoClose: 3000,
      theme: "colored",
      closeButton: false,
      hideProgressBar: true,
    };
    switch (type) {
      case "warning":
        toast.warning(text, toastOptions);
        break;
      case "success":
        toast.success(text, toastOptions);
        break;
      default:
        break;
    }
  };

  beforeAddToCart = () => {
    const allSelected = this.state.attributes.every(
      (att) => att.selectedVal != null
    );
    if (allSelected) {
      const productToCart = {
        ...this.state.product,
        attributes: this.state.attributes,
      };
      this.props.addToCart(productToCart);
      this.showBannerNotification(`You have added ${productToCart.name} to your bag`, 'success');
    } else {
      const notSelected = this.state.attributes.find(
        (att) => att.selectedVal == null
      );
      this.showBannerNotification(`Please select ${notSelected.name} option`, 'warning');
    }
  };

  displayProductPrice = () => {
    const currency = this.props.currency.selectedCurrency;
    const price = this.state.product.prices.find(
      (price) => price.currency === currency
    );
    return `${currency} ${price.amount}`;
  };

  render() {
    if (this.state.product === null) return <Loader />;

    return (
      <section className="product-page">
        <div className="product-page__gallery">
          <div className="gallery__thumbnails">
            {this.state.product.gallery.map((image, index) => {
              return (
                <img
                  key={`${this.state.product.id}-image-${index}`}
                  onClick={() => this.selectProductImage(image)}
                  src={image}
                  alt={this.state.product.name}
                />
              );
            })}
          </div>
          <div className="gallery__full-image">
            <img src={this.state.selectedImage} alt="" />
          </div>
        </div>
        <div className="product-page__product-info">
          <div className="product-info__name">{this.state.product.name}</div>
          {this.state.attributes.map((attrib) => {
            return (
              <div key={attrib.id} className="product-info__attributes">
                <div className="attributes__title">{attrib.name}:</div>
                <div className="attributes__options">
                  {attrib.items.map((item) => {
                    if (attrib.type === "swatch") {
                      return (
                        <button
                          key={item.id}
                          onClick={() =>
                            this.selectProductAttribute(
                              attrib.id,
                              item.displayValue
                            )
                          }
                          className={`option option--swatch ${
                            attrib.selectedVal === item.displayValue
                              ? "option--selected"
                              : ""
                          }`}
                          style={{
                            backgroundColor: `${item.value}`,
                            opacity: `${
                              attrib.selectedVal === item.displayValue
                                ? "1"
                                : "0.3"
                            }`,
                          }}
                        ></button>
                      );
                    }
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          this.selectProductAttribute(
                            attrib.id,
                            item.displayValue
                          )
                        }
                        className={`option ${
                          attrib.selectedVal === item.displayValue
                            ? "option--selected"
                            : ""
                        }`}
                      >
                        {item.displayValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="product-info__price">
            <h3 className="price__label">Price:</h3>
            <h3 className="price__amount">{this.displayProductPrice()}</h3>
          </div>
          <div className="product-info__add-to-cart">
            <button
              onClick={() => this.beforeAddToCart()}
              className="btn-add-to-cart"
            >
              ADD TO CART
            </button>
          </div>
          <div className="product-info__description">
            {parse(this.state.product.description)}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
    currency: state.shop.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
