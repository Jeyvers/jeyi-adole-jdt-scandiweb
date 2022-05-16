import React, { Component } from 'react';
import { SingleProductClass } from './SingleProduct';

export class CartItem extends Component {
  render() {
    return (
      <div className='cart-item'>
        <div className='cart-info'>
          <SingleProductClass.SingleProductInformation
            information={this.props}
            allAttributes={this.props.attributes}
          />
        </div>
        <div className='cart-showcase'></div>
      </div>
    );
  }
}

export default CartItem;
// inhospitable environment, low mortility
