import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMiniCart } from '../slices/cartSlice';

class CartOverlay extends Component {
  render() {
    return (
      <>
        <div
          onClick={() => this.props.setMiniCart()}
          className={`mini-cart-overlay ${!this.props.miniCart && 'hidden'} `}
        ></div>
        <div
          className={`mini-cart-container ${!this.props.miniCart && 'hidden'} `}
        >
          <header>
            {/* Not the best way to solve this >>>. */}
            <button className='remove-cart-overlay'>
              <FaTimes onClick={() => this.props.setMiniCart()} />
            </button>
            <p>
              My Bag: <span>{this.props.amount} items</span>
            </p>
          </header>
          <Cart />
          <footer>
            <div className='mini-cart-total'>
              <p>Total</p>
              <p>
                {' '}
                {this.props.currencyInUse}
                {this.props.total.toFixed(2)}
              </p>
            </div>
            <div className='mini-cart-footer-btns'>
              <Link to='/cart'>
                <button
                  className='cart-btn view'
                  onClick={() => this.props.setMiniCart()}
                >
                  {'VIEW BAG '}
                </button>
              </Link>
              <Link to='/'>
                <button className='cart-btn check'>CHECK OUT</button>
              </Link>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyInUse: state.products.currencyInUse,
  amount: state.cart.amount,
  total: state.cart.total,
  miniCart: state.cart.miniCart,
});

const mapDispatchToProps = (dispatch) => ({
  setMiniCart: () => dispatch(setMiniCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
