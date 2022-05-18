import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, getCategory, changeCurrency } from './slices/productsSlice';
import { addItem, calculateTotals } from './slices/cartSlice';

import Products from './components/Products';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import { loadProducts } from './slices/cartSlice';
import { Link } from 'react-router-dom';

export class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.miniCartOverlay = React.createRef();
    this.miniCart = React.createRef();
    this.removeOrAddMiniCart = this.removeOrAddMiniCart.bind(this);
    this.cartOverlay = this.cartOverlay.bind(this);
  }

  async componentDidMount() {
    await this.props.getProducts();
    await this.props.loadProducts(this.props.products);

    this.props.calculateTotals(this.props.currencyInUse);
  }

  removeOrAddMiniCart(e) {
    // Receives miniCart ref from AppWrapper and checks the condition of miniCart's classList
    console.log(e.target, this.miniCart, this.miniCartOverlay);
    if (
      e.target.offsetParent !== this.miniCart.current &&
      e.target !== this.miniCart.current
    ) {
      const miniCartClass = this.miniCartOverlay.current.classList;
      if (miniCartClass.contains('hidden')) {
        miniCartClass.remove('hidden');
      } else {
        miniCartClass.add('hidden');
      }
    }
  }

  cartOverlay() {
    return (
      <div
        ref={this.miniCartOverlay}
        onClick={(e) => this.removeOrAddMiniCart(e)}
        className='mini-cart-overlay hidden'
      >
        <div ref={this.miniCart} className='mini-cart-container '>
          <header>
            <p>
              My Bag: <span>{this.props.amount} items</span>
            </p>
          </header>
          <Cart></Cart>
          <footer>
            <div className='mini-cart-total'>
              <p>Total</p>
              <p>
                {' '}
                {this.props.currencyInUse}
                {this.props.total}
              </p>
            </div>
            <div className='mini-cart-footer-btns'>
              <button className='white-btn'>
                <Link to='/cart'>{'VIEW BAG '}</Link>
              </button>

              <button className='add-btn'>CHECK OUT</button>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <Navbar
          {...this.props}
          removeOrAddMiniCart={this.removeOrAddMiniCart}
        />
        <this.cartOverlay />

        <main>
          <Routes>
            <Route exact path='/' element={<Products {...this.props} />} />
            <Route
              path='/products/:productId'
              element={
                <SingleProduct currencyInUse={this.props.currencyInUse} />
              }
            />
            <Route
              path='/cart'
              element={
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
                        {this.props.total ? this.props.total : 0}
                      </p>
                    </div>
                  </div>
                  <button className='add-btn'>ORDER</button>
                </div>
              }
            />
            <Route
              path='*'
              element={<h2>Nothing here. Please go back to main page.</h2>}
            />
          </Routes>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
  currencies: state.products.currencies,
  currentCategory: state.products.currentCategory,
  currencyInUse: state.products.currencyInUse,
  amount: state.cart.amount,
  total: state.cart.total,
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getData()),
  getCategory: (category) => dispatch(getCategory(category)),
  changeCurrency: (currency) => dispatch(changeCurrency(currency)),
  loadProducts: (products) => dispatch(loadProducts(products)),
  calculateTotals: (id) => dispatch(calculateTotals(id)),
  addItem: (id) => dispatch(addItem({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
