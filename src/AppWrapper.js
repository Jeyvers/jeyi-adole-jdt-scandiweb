import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './components/Products';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SingleProduct from './components/SingleProduct';
import CartPage from './Pages/CartPage';
import Error from './Pages/Error';
import CartOverlay from './components/CartOverlay';
import { calculateTotals } from './slices/cartSlice';

export class AppWrapper extends Component {
  componentDidUpdate() {
    this.props.calculateTotals(this.props.currencyInUse);
  }

  render() {
    return (
      <>
        <Navbar />
        <CartOverlay />
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
  calculateTotals: (currencyInUse) => dispatch(calculateTotals(currencyInUse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
