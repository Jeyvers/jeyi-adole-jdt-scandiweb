import React, { Component } from 'react';
import { increase, decrease, removeItem } from '../slices/cartSlice';
import { connect } from 'react-redux';
import CartItem from './CartItem';

export class Cart extends Component {
  render() {
    return (
      <div className='cart-items-container'>
        <div className='cart-items'>
          {console.log('C', this.props)}
          {this.props.cart?.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.id}
                {...cartItem}
                currencyInUse={this.props.currencyInUse}
                {...this.props}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  currencyInUse: state.products.currencyInUse,
});

const mapDispatchToProps = (dispatch) => ({
  increase: (id) => dispatch(increase({ id })),
  decrease: (id) => dispatch(decrease({ id })),
  removeItem: (id) => dispatch(removeItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
