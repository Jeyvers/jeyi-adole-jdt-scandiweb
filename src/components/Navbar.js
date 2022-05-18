import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  BagIcon,
  CartIconBlack,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../icons';

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
            <button
              className='cart-icon'
              onClick={(e) => this.props.removeOrAddMiniCart(e)}
            >
              <span className='cart-icon-amount'>{this.props.amount}</span>
              <CartIconBlack />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
