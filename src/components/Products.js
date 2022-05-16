import React, { Component } from 'react';
import Cart from './Cart';
import Product from './Product';

export class Products extends Component {
  render() {
    return (
      <div className='showcase'>
        <div className='cart-overlay'>
          <Cart />
        </div>
        <div className='products-container'>
          <h1>{this.props.currentCategory}</h1>
          <div className='products'>
            {this.props.products?.map((product) => {
              const defaultPrice = product.prices.find(
                (price) => price.currency.symbol === this.props.currencyInUse
              );
              return (
                <div className='product-container' key={product.id}>
                  <Product {...product} defaultPrice={defaultPrice} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
