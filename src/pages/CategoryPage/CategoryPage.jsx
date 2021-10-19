import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductCard from '../../Components/ProductCard';
import './styles.scss';

class CategoryPage extends Component {
    render() {
        const { products, categoryName, allproducts } = this.props;
        const productsByCategory = allproducts ? products : products.filter(prod => prod.category === categoryName);
        return (
            <section className="category-page">
                <h2 className="category-page__title">
                    {categoryName}
                </h2>
                <div className="category-page__products">
                    { productsByCategory.map(product => {
                        return (<ProductCard key={product.id} product={product}/>);
                    }) }
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shop.products,
    }
}

export default connect(mapStateToProps)(CategoryPage);
