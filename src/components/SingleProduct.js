import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleProductData } from '../slices/singleProductSlice';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
  }

  render() {
    const {
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes,
      brand,
      prices,
    } = this.props.productData;
    // const firstImage = gallery[0];
    return (
      <section className='single-product-container'>
        <div className='all-images'>
          <div className='all-images-image'>
            {gallery?.length > 1 &&
              gallery?.map((picture, index) => (
                <img key={index} src={picture} alt='' />
              ))}
          </div>
        </div>
        <div className='primary-image'>
          {/* <img src={firstImage} alt='' /> */}
        </div>
        <div className='single-product-information'>
          <h1>{brand}</h1>
          <p>{name}</p>
          <p>{description}</p>
          <p>{category}</p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.singleProduct.productData,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProductData: (id) => dispatch(getSingleProductData(id)),
});

// export default withParams(SingleProduct);
export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
