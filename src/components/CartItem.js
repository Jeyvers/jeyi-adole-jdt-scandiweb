import React, { Component } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImg: 0,
    };

    this.ProductAttribute = this.ProductAttribute.bind(this);
    this.nextImg = this.nextImg.bind(this);
  }

  ProductAttribute(props) {
    // this does the same thing as the same component in singleProduct
    const { name, type, items } = props.attribute;
    let defaultValue;
    const selectedAttributes = Object.keys(props.allAttributes);
    // Maps through all the attributes and sets the defaultValue to the name of the current name in the map
    selectedAttributes.map(
      (attr) =>
        attr === name &&
        (defaultValue = props.selectedAttributes
          ? props.selectedAttributes[name]
          : props.allAttributes[name])
    );
    const colorSwatch = type === 'swatch';

    return (
      <div className='attribute'>
        <h4>{name}</h4>
        <div className='name-attributes'>
          {items.map((item, index) => {
            // Maps through the items and gets the value that's equal to the defaultValue
            const defaultItem = item.value === defaultValue;
            return !colorSwatch ? (
              <span
                key={index}
                className={`text-attribute ${defaultItem && 'default'}`}
                // onClick={() => this.props.setAttributeValue(name, item.value)}
              >
                {item.value}
              </span>
            ) : (
              <div
                className={` ${defaultItem && 'swatch-default'}`}
                key={index}
              >
                <button
                  key={index}
                  style={{ backgroundColor: item.value }}
                  onClick={() => {
                    // this.props.setAttributeValue(name, item.value);
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

  prevImg(gallery) {
    if (this.state.currentImg > 0) {
      this.setState({ currentImg: this.state.currentImg - 1 });
    } else {
      this.setState({ currentImg: gallery.length - 1 });
    }
  }
  nextImg(gallery) {
    // currentImg is a number that determines the source attribute of the cart-img
    if (this.state.currentImg < gallery.length - 1) {
      this.setState({ currentImg: this.state.currentImg + 1 });
    } else {
      this.setState({ currentImg: 0 });
    }
  }

  render() {
    const {
      uniqueId,
      brand,
      name,
      prices,
      attributes,
      amount,
      gallery,
      selectedAttributes,
    } = this.props;

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.currencyInUse
    );

    return (
      <div className='cart-item'>
        <div className='cart-info'>
          <div className='titles'>
            <h1>{brand}</h1>
            <h3>{name}</h3>
          </div>
          <div className='price'>
            <h4 className='price-info'>
              {defaultPrice?.currency.symbol}
              {defaultPrice.amount?.toFixed(2).toLocaleString()}
            </h4>
          </div>

          {attributes?.map((attribute) => {
            const newAttrArray = {};
            const { name, items } = attribute;
            newAttrArray[name] = items[0].value;

            return (
              <this.ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={newAttrArray}
                selectedAttributes={selectedAttributes}
              />
            );
          })}
        </div>
        <div className='cart-showcase'>
          <div className='cart-item-amount'>
            <span onClick={() => this.props.increase(uniqueId)}>+</span>
            <h2> {amount} </h2>
            <span
              onClick={() => {
                if (amount === 1) {
                  this.props.removeItem(uniqueId);
                } else {
                  this.props.decrease(uniqueId);
                }
              }}
            >
              -
            </span>
          </div>
          <div className='cart-item-img'>
            <img src={gallery && gallery[this.state.currentImg]} alt='' />
            {gallery.length > 1 && (
              <div className='cart-sliders'>
                <button onClick={() => this.prevImg(gallery)}>
                  <AiOutlineLeft />
                </button>

                <button onClick={() => this.nextImg(gallery)}>
                  <AiOutlineRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
