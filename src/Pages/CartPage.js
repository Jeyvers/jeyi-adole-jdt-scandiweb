import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';

export class CartPage extends Component {
  render() {
    return (
      <div className='cart-body'>
        <h2>CART</h2>
        <Cart />

        <div className='cart-item footer'>
          <div>
            <p>Quanity:</p>
            <p>Total:</p>
          </div>
          <div className='numbers'>
            <p>{this.props.amount} </p>
            <p>
              {this.props.currencyInUse}
              {this.props.total ? this.props.total.toFixed(2) : 0}
            </p>
          </div>
        </div>
        <button className='add-btn'>ORDER</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencyInUse: state.products.currencyInUse,
  amount: state.cart.amount,
  total: state.cart.total,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
