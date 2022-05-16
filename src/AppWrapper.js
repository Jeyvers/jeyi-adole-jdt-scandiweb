import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, getCategory, changeCurrency } from './slices/productsSlice';
import {} from './slices/productsSlice';

import Products from './components/Products';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import { loadProducts } from './slices/cartSlice';

export class AppWrapper extends Component {
  async componentDidMount() {
    await this.props.getProducts();
    await this.props.loadProducts(this.props.products);
  }

  render() {
    return (
      <main>
        <Navbar {...this.props} />
        <Routes>
          <Route exact path='/' element={<Products {...this.props} />} />
          <Route
            path='/products/:productId'
            element={<SingleProduct currencyInUse={this.props.currencyInUse} />}
          />
          <Route path='/cart' element={<Cart />} />
          <Route
            path='*'
            element={<h2>Nothing here. Please go back to main page.</h2>}
          />
        </Routes>
        {/* <Products {...this.props} /> */}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
  currencies: state.products.currencies,
  currentCategory: state.products.currentCategory,
  currencyInUse: state.products.currencyInUse,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getData()),
  getCategory: (category) => dispatch(getCategory(category)),
  changeCurrency: (currency) => dispatch(changeCurrency(currency)),
  loadProducts: (products) => dispatch(loadProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
