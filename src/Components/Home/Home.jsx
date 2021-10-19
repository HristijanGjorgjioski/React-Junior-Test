import { Component } from "react";


class Home extends Component {
    state = {
        product: null,
        selectedImage: null,
        attributes: null,
    };

    render() {
        if (this.state.product === null) return <Loader />;

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
                </div>
            </section>
        )
    }
}
