import React, { Component } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { SingleProductClass } from './SingleProduct';

export class CartItem extends Component {
  render() {
    const { id, brand, name, prices, attributes, amount, gallery } = this.props;

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.currencyInUse
    );

    const finalPrice = defaultPrice.amount * amount;
    return (
      <div className='cart-item'>
        <div className='cart-info'>
          <div className='titles'>
            <h1>{brand}</h1>
            <h3>{name}</h3>
          </div>
          <div className='price'>
            <h4 className='price-info'>
              {defaultPrice?.currency.symbol}
              {finalPrice?.toFixed(2).toLocaleString()}
            </h4>
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
            <span onClick={() => this.props.increase(id)}>+</span>
            <h2> {amount} </h2>
            <span
              onClick={() => {
                if (amount === 1) {
                  this.props.removeItem(id);
                } else {
                  this.props.decrease(id);
                }
              }}
            >
              -
            </span>
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
