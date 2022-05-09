import { Component } from 'react';
import { BagIcon, CartIcon, ChevronDownIcon, ChevronUpIcon } from '../icons';

export class Navbar extends Component {
  state = {
    active: '$',
    view: false,
  };

  render() {
    return (
      <nav>
        <div className='div'>
          <ul>
            {this.props.categories.map((category) => (
              <li
                className={`${
                  this.props.currentCategory === category.name &&
                  'active-category'
                }`}
                key={category.name}
                onClick={() => this.props.getCategory(category.name)}
              >
                {category.name}
              </li>
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
              <p>{this.state.active}</p>

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
                  }}
                >
                  <span>{currency.symbol}</span>
                  <span>{currency.label}</span>
                </p>
              ))}
            </div>
          </div>
          <CartIcon />
        </div>
      </nav>
    );
  }
}

export default Navbar;
