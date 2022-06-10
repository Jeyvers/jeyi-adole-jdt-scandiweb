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

        {props.defaultPrice.amount.toFixed(2).toLocaleString()}
      </p>
    );
  }

  render() {
    const { id, gallery, name, inStock, defaultPrice, brand } = this.props;

    return (
      // Link to directs to singleProduct page onclick
      <Link to={`/products/${id}`}>
        <div key={id} className='product'>
          <div className='product-img-container'>
            <img src={gallery[0]} alt={name} />
          </div>
          <div className='product-information'>
            <span>
              {brand} &nbsp;
              {name}
            </span>
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
// Todos
// Make mini cart page >>>
// implement slide functionality >>>
// Call for help on useEffect class equivalent
// Make cartItem info width 100%/min-width of its parent container >>>
// Write responsive css for all pages and components >>>
// Review work
// Call Tife & Steve to Review work
