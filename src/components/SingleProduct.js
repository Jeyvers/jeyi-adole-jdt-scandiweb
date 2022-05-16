import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {
  getSingleProductData,
  setAttributeValue,
} from '../slices/singleProductSlice';
import { addItem } from '../slices/cartSlice';
import { Link } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class SingleProduct extends Component {
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
    this.SingleProductInformation = this.SingleProductInformation.bind(this);
  }

  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
  }

  ProductAttribute(props) {
    const { id, name, type, items } = props.attribute;
    let defaultValue;
    const allAttributes = Object.keys(props.allAttributes);
    allAttributes.map(
      (attr) => attr === name && (defaultValue = this.props.allAttributes[name])
    );
    const colorSwatch = type === 'swatch';
    return (
      <div className='attribute'>
        <h4>{name}</h4>
        <div className='name-attributes'>
          {items.map((item, index) => {
            const defaultItem = item.value === defaultValue;
            return !colorSwatch ? (
              <span
                key={index}
                className={`text-attribute ${defaultItem && 'default'}`}
                onClick={() => this.props.setAttributeValue(name, item.value)}
              >
                {item.value}
              </span>
            ) : (
              <div className={` ${defaultItem && 'swatch-default'}`}>
                <button
                  key={index}
                  style={{ backgroundColor: item.value }}
                  onClick={() => {
                    this.props.setAttributeValue(name, item.value);
                  }}
                  className='swatch-attribute'
                ></button>
              </div>
            );
          })}
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

  SingleProductInformation(props) {
    const { name, brand, attributes } = props.information;
    const { allAttributes } = props;
    return (
      <>
        <div className='titles'>
          <h1>{brand}</h1>
          <h3>{name}</h3>
        </div>
        <div className='attributes'>
          {attributes?.map((attribute) => {
            return (
              <this.ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={allAttributes}
              />
            );
          })}
          <div className='price'>
            <h4>Price: </h4>
            <h4 className='price-info'>
              {props.defaultPrice?.currency.symbol}
              {props.defaultPrice?.amount.toLocaleString()}
            </h4>
          </div>
        </div>
      </>
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
          <this.SingleProductInformation
            information={this.props.productData}
            allAttributes={this.props.allAttributes}
            defaultPrice={defaultPrice}
          />
          <button
            disabled={!inStock}
            onClick={() => {
              this.props.addItem(id);
            }}
            className='add-btn'
          >
            ADD TO CART
          </button>
          {parse(`${description}`)}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.singleProduct.productData,
  allAttributes: state.singleProduct.attributes,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProductData: (id) => dispatch(getSingleProductData(id)),
  setAttributeValue: (name, value) =>
    dispatch(setAttributeValue({ name, value })),
  addItem: (id) => dispatch(addItem({ id })),
});

const SingleProductClass = new SingleProduct();

// export default withParams(SingleProduct);

export { SingleProductClass };
export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
