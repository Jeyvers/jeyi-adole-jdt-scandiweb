import React, { Component } from 'react';
import { CartIconWhite } from '../icons';
import Product from './Product';
import { connect } from 'react-redux';
import { getData, getCategory, changeCurrency } from '../slices/productsSlice';
import { addItem, calculateTotals } from '../slices/cartSlice';
import { loadProducts } from '../slices/cartSlice';

export class Products extends Component {
  async componentDidMount() {
    await this.props.getProducts();
    await this.props.loadProducts(this.props.allItems);
    this.props.calculateTotals(this.props.currencyInUse);
  }

  render() {
    return (
      <>
        <div className='showcase'>
          <div className='products-container'>
            {/* Current Category changes in the state depending on the category user chooses. Default category is 'all' */}
            <h1>{this.props.currentCategory}</h1>

            <div className='products'>
              {this.props.products?.map((product) => {
                // If current item is in the cart
                const inCart = this.props.cartItems.find((item) =>
                  item.id === product.id ? true : false
                );

                // Maps through the list of prices for each product and returns the price of the global statecy in use
                const defaultPrice = product.prices.find(
                  (price) => price.currency.symbol === this.props.currencyInUse
                );

                // Returns product
                return (
                  <div className='product-container' key={product.id}>
                    <div className='in-cart-icon'>
                      <button
                        disabled={!product.inStock ? !product.inStock : inCart}
                        onClick={() => this.props.addItem(product.id)}
                      >
                        <CartIconWhite />
                      </button>
                    </div>
                    <Product
                      cartItems={this.props.cartItems}
                      {...product}
                      defaultPrice={defaultPrice}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
  allItems: state.products.allItems,
  currencies: state.products.currencies,
  currentCategory: state.products.currentCategory,
  currencyInUse: state.products.currencyInUse,
  amount: state.cart.amount,
  total: state.cart.total,
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getData()),
  getCategory: (category) => dispatch(getCategory(category)),
  changeCurrency: (currency) => dispatch(changeCurrency(currency)),
  loadProducts: (products) => dispatch(loadProducts(products)),
  calculateTotals: (currencyInUse) => dispatch(calculateTotals(currencyInUse)),
  addItem: (id) => dispatch(addItem({ id })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);
