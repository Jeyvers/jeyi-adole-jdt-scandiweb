import React, { Component } from 'react';
import { CartIcon } from '../icons';

export class Products extends Component {
  render() {
    return (
      <div className='products-container'>
        <h1>{this.props.currentCategory}</h1>

        <div className='products'>
          {this.props.products?.map((product) => {
            const defaultPrice = product.prices.find(
              (price) => price.currency.symbol === this.props.currencyInUse
            );
            console.log(defaultPrice);
            console.log(product);
            return (
              <div key={product.id} className='product'>
                <div className='product-img-container'>
                  <img src={product.gallery[0]} alt={product.name} />
                </div>
                <div className='product-information'>
                  <div className='in-cart-icon'>
                    <CartIcon className='icon' />
                  </div>
                  <span>{product.name}</span>
                  <p className='product-price'>
                    {defaultPrice.currency.symbol}

                    {defaultPrice.amount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Products;
