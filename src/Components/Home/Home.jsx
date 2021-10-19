import { Component } from "react";
import parse from "html-react-parser";

import './styles.scss'

class Home extends Component {
    state = {
        product: null,
        selectedImage: null,
        attributes: null,
    };

    render() {
        if (this.state.product === null) return 'No products';

        return (
            <section>
                <div className="product-page__gallery">
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
                                                )};
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
                </div>
            </section>
        )
    }
}

export default Home
