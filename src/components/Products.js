import React, { Component } from 'react';
import { CartIconWhite } from '../icons';
import Cart from './Cart';
import Product from './Product';

export class Products extends Component {
  render() {
    return (
      <>
        <Cart></Cart>
        <div className='showcase'>
          <div className='products-container'>
            <h1>{this.props.currentCategory}</h1>
            <div className='products'>
              {this.props.products?.map((product) => {
                const defaultPrice = product.prices.find(
                  (price) => price.currency.symbol === this.props.currencyInUse
                );
                return (
                  <div className='product-container' key={product.id}>
                    <div
                      className='in-cart-icon'
                      onMouseOver={(e) => (e.target.style.display = 'none')}
                    >
                      <button onClick={() => this.props.addItem(product.id)}>
                        <CartIconWhite />
                      </button>
                    </div>
                    <Product {...product} defaultPrice={defaultPrice} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Products;
