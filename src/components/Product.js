import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Product extends Component {
  constructor(props) {
    super(props);
    this.Price = this.Price.bind(this);
  }

  Price(props) {
    return (
      <p className='product-price'>
        {props.defaultPrice.currency.symbol}

        {props.defaultPrice.amount.toLocaleString()}
      </p>
    );
  }

  render() {
    const { id, gallery, name, inStock, defaultPrice } = this.props;

    return (
      <Link to={`/products/${id}`}>
        <div key={id} className='product'>
          <div className='product-img-container'>
            <img src={gallery[0]} alt={name} />
          </div>
          <div className='product-information'>
            <span>{name}</span>
            <this.Price defaultPrice={defaultPrice} />
          </div>
          {!inStock && (
            <div className='product-outOfStock'>
              <p>OUT OF STOCK</p>
            </div>
          )}
        </div>
      </Link>
    );
  }
}

export default Product;
