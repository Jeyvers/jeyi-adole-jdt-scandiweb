import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../slices/productsSlice';

export class Products extends Component {
  async componentDidMount() {
    await this.props.getProducts();
    console.log('ClassProps:', this.props);
  }

  render() {
    return (
      <div className='showcase container'>
        <h3>Category name</h3>
        <div className='flex'>
          {this.props.products?.map((product) => (
            <div key={product.id} className='product'>
              {/* <img src={product.gallery} alt='' /> */}
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.categories[0]?.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
