import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
// import Single
export class Cart extends Component {
  render() {
    return (
      <div className='cart-items-container'>
        <div className='cart-items'>
          {this.props.cart?.map((cartItem) => {
            return <CartItem key={cartItem.id} {...cartItem} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
