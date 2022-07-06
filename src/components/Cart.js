import React, { Component } from 'react';
import { increase, decrease, removeItem } from '../slices/cartSlice';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import { setAttributeValue } from '../slices/singleProductSlice';

export class Cart extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div className='cart-items-container'>
        <div className='cart-items'>
          {this.props.cart?.map((cartItem) => {
            return cartItem.items?.map((item) => {
              return (
                <CartItem
                  key={item.uniqueId}
                  {...item}
                  currencyInUse={this.props.currencyInUse}
                  {...this.props}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  currencyInUse: state.products.currencyInUse,
  allAttributes: state.singleProduct.attributes,
});

const mapDispatchToProps = (dispatch) => ({
  increase: (uniqueId, id) => dispatch(increase({ uniqueId, id })),
  decrease: (uniqueId, id) => dispatch(decrease({ uniqueId, id })),
  removeItem: (uniqueId, id) => dispatch(removeItem({ uniqueId, id })),
  setAttributeValue: (name, value) =>
    dispatch(setAttributeValue({ name, value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
