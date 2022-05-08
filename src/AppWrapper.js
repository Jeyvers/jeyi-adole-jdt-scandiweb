import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, getCategory } from './slices/productsSlice';
import {} from './slices/productsSlice';

import Products from './components/Products';
import Navbar from './components/Navbar';

export class AppWrapper extends Component {
  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    return (
      <div className='main'>
        <Navbar {...this.props} />
        <Products {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  getCategory: (category) => dispatch(getCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
