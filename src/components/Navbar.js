import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  BagIcon,
  CartIconBlack,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../icons';
import { changeCurrency, getCategory } from '../slices/productsSlice';
import { setMiniCart } from '../slices/cartSlice';
import OutsideClickHandler from 'react-outside-click-handler';

export class Navbar extends Component {
  state = {
    view: false,
  };

  render() {
    return (
      <div className='navbar'>
        <nav>
          <div className='div'>
            <ul>
              {this.props.categories.map((category) => (
                <Link key={category.name} to={'/'}>
                  <li
                    className={`${
                      this.props.currentCategory === category.name &&
                      'active-category'
                    }`}
                    onClick={() => this.props.getCategory(category.name)}
                  >
                    {category.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className='nav-brand-logo'>
            <span>
              <BagIcon />
            </span>
          </div>

          {/* NAVBAR CURRENCIES */}
          <div className='nav-curr-cart'>
            <OutsideClickHandler
              onOutsideClick={() => {
                this.setState({ view: false });
              }}
            >
              <div className='nav-currencies'>
                <div
                  className='currency'
                  onClick={() => this.setState({ view: !this.state.view })}
                >
                  <p>{this.props.currencyInUse}</p>

                  {this.state.view ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>

                <div
                  className={`nav-currencies-options ${
                    !this.state.view && 'hidden'
                  }`}
                >
                  {this.props.currencies?.map((currency) => (
                    <p
                      key={currency.symbol}
                      onClick={(e) => {
                        this.setState({ view: !this.state.view });
                        this.setState({ active: currency.symbol });
                        this.props.changeCurrency(currency.symbol);
                      }}
                    >
                      <span>{currency.symbol}</span>
                      <span>{currency.label}</span>
                    </p>
                  ))}
                </div>
              </div>
            </OutsideClickHandler>
            <button
              className='cart-icon'
              onClick={() => {
                this.props.setMiniCart();
              }}
            >
              {this.props.amount > 0 && (
                <span className='cart-icon-amount'>{this.props.amount}</span>
              )}
              <CartIconBlack />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  currencies: state.products.currencies,
  currentCategory: state.products.currentCategory,
  currencyInUse: state.products.currencyInUse,
  amount: state.cart.amount,
});

const mapDispatchToProps = (dispatch) => ({
  getCategory: (category) => dispatch(getCategory(category)),
  setMiniCart: () => dispatch(setMiniCart()),
  changeCurrency: (currency) => dispatch(changeCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
