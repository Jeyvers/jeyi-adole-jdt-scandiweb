import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleProductData } from '../slices/singleProductSlice';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      selectedColor: null,
      selectedSize: null,
      selectedCapacity: null,
    };

    this.Picture = this.Picture.bind(this);
    this.ProductAttribute = this.ProductAttribute.bind(this);
  }

  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
  }

  ProductAttribute(props) {
    const { id, name, type, items } = props.attribute;
    const colorSwatch = type === 'swatch';
    // if (name === 'Capacity') {
    //   this.setState({ selectedCapacity: items[0] });
    // } else if (name === 'Size') {
    //   this.setState({ selectedSize: items[0] });
    // } else if (name === 'Color') {
    //   this.setState({
    //     selectedColor: items[0],
    //   });
    // }

    // console.log(this.state);
    return (
      <div className='attribute'>
        <h4>{name}</h4>
        <div className='name-attributes'>
          {items.map((item, index) =>
            !colorSwatch ? (
              <span key={index} className='text-attribute'>
                {item.value}
              </span>
            ) : (
              <button
                style={{ backgroundColor: item.value }}
                className='swatch-attribute'
              ></button>
            )
          )}
        </div>
      </div>
    );
  }

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

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.currencyInUse
    );

    return (
      <section className='single-product-container'>
        <div className='all-images'>
          <div className='all-images-image'>
            {gallery?.length > 1 &&
              gallery?.map((picture, index) => (
                <this.Picture key={index} picture={picture} />
              ))}
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
          <div className='titles'>
            <h1>{brand}</h1>
            <h3>{name}</h3>
          </div>
          <div className='attributes'>
            {attributes?.map((attribute) => (
              <this.ProductAttribute key={attribute.id} attribute={attribute} />
            ))}
            <div className='price'>
              <h4>Price: </h4>
              <h4 className='price-info'>
                {defaultPrice?.currency.symbol}
                {defaultPrice?.amount}
              </h4>
            </div>
            <button disabled={!inStock} className='add-btn'>
              ADD TO CART
            </button>
          </div>

          {parse(`${description}`)}

          {/* <p>{category}</p> */}
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
