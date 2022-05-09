import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, getCategory } from './slices/productsSlice';
import {} from './slices/productsSlice';

import Products from './components/Products';
import Navbar from './components/Navbar';

export class AppWrapper extends Component {
  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    return (
      <main>
        <Navbar {...this.props} />
        <Products {...this.props} />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
  currencies: state.products.currencies,
  currentCategory: state.products.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getData()),
  getCategory: (category) => dispatch(getCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
