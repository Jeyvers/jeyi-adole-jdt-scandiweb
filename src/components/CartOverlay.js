import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMiniCart } from '../slices/cartSlice';

// export function removeMiniCart() {
//   console.log('removing mini cart');
//   console.log(CartOverlay);
//   const Overlay = this.miniCartOverlay.current.classList;
//   if (Overlay.contains('hidden')) {
//     Overlay.remove('hidden');
//     this.miniCart.current.classList.remove('hidden');
//   } else {
//     Overlay.add('hidden');
//     this.miniCart.current.classList.add('hidden');
//   }
// }

export class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.miniCartOverlay = React.createRef();
    this.miniCart = React.createRef();
    this.removeMiniCart = this.removeMiniCart.bind(this);
  }

  removeMiniCart() {
    console.log('MINIOVERLAY', this.miniCartOverlay);
    console.log('MINICART', this.miniCart);

    // const Overlay = this.miniCartOverlay.current.classList;
    // if (Overlay.contains('hidden')) {
    //   Overlay.remove('hidden');
    //   this.miniCart.current.classList.remove('hidden');
    // } else {
    //   Overlay.add('hidden');
    //   this.miniCart.current.classList.add('hidden');
    // }
  }

  render() {
    return (
      <>
        <div
          ref={this.miniCartOverlay}
          onClick={() => this.removeMiniCart()}
          className={`mini-cart-overlay ${!this.props.miniCart && 'hidden'} `}
        ></div>
        <div ref={this.miniCart} className='mini-cart-container hidden'>
          <header>
            {/* Not the best way to solve this >>>. */}
            <button className='remove-cart-overlay'>
              <FaTimes onClick={() => this.removeMiniCart()} />
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
              <button
                className='white-btn '
                onClick={() => this.removeMiniCart()}
              >
                <Link to='/cart'>{'VIEW BAG '}</Link>
              </button>

              <button className='add-btn'>CHECK OUT</button>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export const CartOverlayInstance = new CartOverlay();

const mapStateToProps = (state) => ({
  currencyInUse: state.products.currencyInUse,
  amount: state.cart.amount,
  total: state.cart.total,
  miniCart: state.cart.miniCart,
});

const mapDispatchToProps = (dispatch) => ({
  setMiniCart: dispatch(setMiniCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
