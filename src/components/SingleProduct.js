import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {
  getSingleProductData,
  setAttributeValue,
} from '../slices/singleProductSlice';
import { addItem } from '../slices/cartSlice';
import _ from 'lodash';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
    };

    this.Picture = this.Picture.bind(this);
    this.ProductAttribute = this.ProductAttribute.bind(this);
    this.SingleProductInformation = this.SingleProductInformation.bind(this);
    this.validateAddItem = this.validateAddItem.bind(this);
  }

  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
    window.scroll(0, 0);
  }

  validateAddItem() {
    const { id } = this.props.productData;
    const selectedAttributes = this.props.allAttributes;
    const itemAttributeExists = this.props.cartItems.find((cartItem) =>
      _.isEqual(selectedAttributes, cartItem.selectedAttributes)
    );

    if (itemAttributeExists) {
      return;
    } else {
      this.props.addItem(id, selectedAttributes);
    }
  }

  ProductAttribute(props) {
    const { name, type, items } = props.attribute;
    let defaultValue;
    // allAttributes contains a default value for for each product attribute when data is fetched. Because allAttributes is an object, I get the data from allAttributes in the form 'Color: #333' using the below code, then set defaultValue for each product attribute to default value returned
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
            // If the value of the item we're currently mapping through equals the defaultValue of the particular attribute, set it as the default Item which will then determine the user interface given for the attribute item the user chooses.
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
              <div
                className={` ${defaultItem && 'swatch-default'}`}
                key={index}
              >
                <button
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
              {props.defaultPrice?.amount.toFixed(2).toLocaleString()}
            </h4>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { id, inStock, gallery, description, prices } =
      this.props.productData;

    // DefaultPrice and incart explanation in products.js
    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.currencyInUse
    );

    const inCart = this.props.cartItems.find((item) =>
      item.id === id ? true : false
    );

    return (
      <section className='single-product-container'>
        <div className='all-images'>
          <div className='all-images-image'>
            {/* Checks if gallery length is greatear than one, then render the picture slide */}
            {gallery?.length > 1 &&
              gallery?.map((picture, index) => (
                <this.Picture key={index} picture={picture} />
              ))}
          </div>
          <div className='primary-image'>
            {/* if gallery is undefined, renders active elemnent in state */}
            <img
              src={
                this.state.active ? this.state.active : gallery && gallery[0]
              }
              alt=''
            />
            {!inStock && (
              <div className='product-outOfStock'>
                <p>OUT OF STOCK</p>
              </div>
            )}
          </div>
        </div>
        <div className='single-product-information'>
          <this.SingleProductInformation
            information={this.props.productData}
            allAttributes={this.props.allAttributes}
            defaultPrice={defaultPrice}
          />
          <button
            // disabled={!inStock ? !inStock : inCart}
            onClick={() => {
              this.validateAddItem();
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
  cartItems: state.cart.cartItems,
  currencyInUse: state.products.currencyInUse,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProductData: (id) => dispatch(getSingleProductData(id)),
  setAttributeValue: (name, value) =>
    dispatch(setAttributeValue({ name, value })),
  addItem: (id, selectedAttributes) =>
    dispatch(addItem({ id, selectedAttributes })),
});

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
