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
                const inCart = this.props.cartItems.find((item) =>
                  item.id === product.id ? true : false
                );
                const defaultPrice = product.prices.find(
                  (price) => price.currency.symbol === this.props.currencyInUse
                );
                return (
                  <div className='product-container' key={product.id}>
                    <div className='in-cart-icon'>
                      <button
                        disabled={inCart}
                        onClick={() => this.props.addItem(product.id)}
                      >
                        <CartIconWhite />
                      </button>
                    </div>
                    <Product
                      cartItems={this.props.cartItems}
                      {...product}
                      defaultPrice={defaultPrice}
                    />
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
