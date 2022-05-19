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
    const allAttributes = Object.keys(props.allAttributes);
    // Maps through all the attributes and sets the defaultValue to the name of the current name in map
    allAttributes.map(
      (attr) => attr === name && (defaultValue = props.allAttributes[name])
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

  prevImg() {
    if (this.state.currentImg > 0) {
      this.setState({ currentImg: this.state.currentImg - 1 });
    } else {
      this.setState({ currentImg: 0 });
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
    const { id, brand, name, prices, attributes, amount, gallery } = this.props;

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.currencyInUse
    );

    const finalPrice = defaultPrice.amount * amount;
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
              {finalPrice?.toFixed(2).toLocaleString()}
            </h4>
          </div>

          {console.log(this.props)}
          {attributes?.map((attribute) => {
            return (
              <this.ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={this.props.allAttributes}
              />
            );
          })}
        </div>
        <div className='cart-showcase'>
          <div className='cart-item-amount'>
            <span onClick={() => this.props.increase(id)}>+</span>
            <h2> {amount} </h2>
            <span
              onClick={() => {
                if (amount === 1) {
                  this.props.removeItem(id);
                } else {
                  this.props.decrease(id);
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
                <button onClick={() => this.prevImg()}>
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
// inhospitable environment, low mortility
