import React, { Component } from 'react';

export class Products extends Component {
  render() {
    return (
      <div className='products container'>
        <h1>{this.props.currentCategory}</h1>
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

export default Products;
