import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CartIconWhite } from '../icons';

export class Product extends Component {
  render() {
    const { id, gallery, name, inStock, defaultPrice } = this.props;
    return (
      <Link to={`/products/${id}`}>
        <div key={id} className='product'>
          <div className='product-img-container'>
            <img src={gallery[0]} alt={name} />
          </div>
          <div className='product-information'>
            <div className='in-cart-icon'>
              <p>
                <CartIconWhite />{' '}
              </p>
            </div>
            <span>{name}</span>
            <p className='product-price'>
              {defaultPrice.currency.symbol}

              {defaultPrice.amount}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Product;
