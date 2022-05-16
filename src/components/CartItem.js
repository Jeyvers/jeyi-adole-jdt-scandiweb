import React, { Component } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { SingleProductClass } from './SingleProduct';

export class CartItem extends Component {
  render() {
    const { brand, name, prices, attributes, amount, gallery } = this.props;

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.currencyInUse
    );
    return (
      <div className='cart-item'>
        <div className='cart-info'>
          <h3>{brand}</h3>
          <h3>{name}</h3>
          <div className='price'>
            <h5>Price: </h5>
            <h5 className='price-info'>
              {defaultPrice?.currency.symbol}
              {defaultPrice?.amount.toLocaleString()}
            </h5>
          </div>
          {console.log(this.props)}
          {attributes?.map((attribute) => {
            return (
              <SingleProductClass.ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={attributes}
              />
            );
          })}
        </div>
        <div className='cart-showcase'>
          <div className='cart-item-amount'>
            <FaPlus />
            <span> {amount} </span>
            <FaMinus />
          </div>
          <div className='cart-item-img'>
            <img src={gallery && gallery[0]} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
// inhospitable environment, low mortility
