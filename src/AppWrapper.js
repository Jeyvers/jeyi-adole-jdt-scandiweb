import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, getCategory, changeCurrency } from './slices/productsSlice';
import { addItem, calculateTotals } from './slices/cartSlice';
import { FaTimes } from 'react-icons/fa';
import Products from './components/Products';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import { loadProducts } from './slices/cartSlice';
import { Link } from 'react-router-dom';
import CartPage from './Pages/CartPage';
import Error from './Pages/Error';
import CartOverlay from './components/CartOverlay';

export class AppWrapper extends Component {
  // constructor(props) {
  //   super(props);
  //   this.miniCartOverlay = React.createRef();
  //   this.miniCart = React.createRef();
  //   this.removeMiniCart = this.removeMiniCart.bind(this);
  //   this.cartOverlay = this.cartOverlay.bind(this);
  // }

  componentDidUpdate() {
    this.props.calculateTotals(this.props.currencyInUse);
  }

  // removeMiniCart() {
  //   // Removes miniCartOverlay

  //   const Overlay = this.miniCartOverlay.current.classList;
  //   if (Overlay.contains('hidden')) {
  //     Overlay.remove('hidden');
  //     this.miniCart.current.classList.remove('hidden');
  //   } else {
  //     Overlay.add('hidden');
  //     this.miniCart.current.classList.add('hidden');
  //   }
  // }

  // cartOverlay() {
  //   // IF miniCartOverlay has the hidden class, set miniCartIsFalse
  //   return (
  //     <>
  //       <div
  //         ref={this.miniCartOverlay}
  //         onClick={() => this.removeMiniCart()}
  //         className='mini-cart-overlay hidden '
  //       ></div>
  //       <div ref={this.miniCart} className='mini-cart-container hidden'>
  //         <header>
  //           {/* Not the best way to solve this >>>. */}
  //           <button className='remove-cart-overlay'>
  //             <FaTimes onClick={() => this.removeMiniCart()} />
  //           </button>
  //           <p>
  //             My Bag: <span>{this.props.amount} items</span>
  //           </p>
  //         </header>
  //         <Cart />
  //         <footer>
  //           <div className='mini-cart-total'>
  //             <p>Total</p>
  //             <p>
  //               {' '}
  //               {this.props.currencyInUse}
  //               {this.props.total.toFixed(2)}
  //             </p>
  //           </div>
  //           <div className='mini-cart-footer-btns'>
  //             <button
  //               className='white-btn '
  //               onClick={() => this.removeMiniCart()}
  //             >
  //               <Link to='/cart'>{'VIEW BAG '}</Link>
  //             </button>

  //             <button className='add-btn'>CHECK OUT</button>
  //           </div>
  //         </footer>
  //       </div>
  //     </>
  //   );
  // }

  render() {
    return (
      <>
        <Navbar {...this.props} />
        <CartOverlay />
        {/* <this.cartOverlay /> */}

        <main>
          <Routes>
            <Route exact path='/' element={<Products />} />
            <Route path='/products/:productId' element={<SingleProduct />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
  allItems: state.products.allItems,
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
  calculateTotals: (currencyInUse) => dispatch(calculateTotals(currencyInUse)),
  addItem: (id) => dispatch(addItem({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
