import React, { Component } from 'react';

export class Products extends Component {
  render() {
    return (
      <div className='showcase container'>
        <h3>{this.props.currentCategory}</h3>
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
