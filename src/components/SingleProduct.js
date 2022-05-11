import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleProductData } from '../slices/singleProductSlice';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    // Calling a base class with:
    super(props);
    // State definition
    this.state = {
      active: '',
    };

    this.Picture = this.Picture.bind(this);
  }
  // state = {
  //   active: '',
  //   handleInput = this.handleInput.bind(this);
  // };

  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
  }

  ProductAttribute() {}

  Picture(props) {
    return (
      <div
        className='single-product-image'
        onClick={() => this.setState({ active: props.picture })}
      >
        <img src={props.picture} alt='' />
      </div>
    );
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

    return (
      <section className='single-product-container'>
        <div className='all-images'>
          <div className='all-images-image'>
            {gallery?.length > 1 &&
              gallery?.map((picture, index) => {
                return (
                  <this.Picture
                    key={index}
                    picture={picture}
                    setState={this.setState}
                  />
                  // <div
                  //   key={index}
                  //   className='single-product-image'
                  //   onClick={() => this.setState({ active: picture })}
                  // >
                  //   <img src={picture} alt='' />
                  // </div>
                );
              })}
          </div>
          <div className='primary-image'>
            <img
              src={
                this.state.active ? this.state.active : gallery && gallery[0]
              }
              alt=''
            />
          </div>
        </div>
        <div className='single-product-information'>
          <h1>{brand}</h1>
          <h3>{name}</h3>
          {description}
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
