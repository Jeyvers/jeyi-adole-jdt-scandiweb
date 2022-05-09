import { Component } from 'react';
import { BagIcon, CartIcon, ChevronDownIcon, ChevronUpIcon } from '../icons';

export class Navbar extends Component {
  state = {
    active: '',
    view: false,
  };

  componentDidMount() {
    this.props.currencies &&
      this.setState({
        ...this.state,
        active: this.props?.currencies[0].symbol,
      });
  }

  render() {
    return (
      <nav>
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
        <div className='nav-brand-logo'>
          <span>
            <BagIcon />
          </span>
        </div>
        {/* NAVBAR CURRENCIES */}
        <div className='nav-curr-cart'>
          <div className='nav-currencies'>
            <div onClick={() => this.setState({ view: !this.state.view })}>
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
                  id={currency.symbol}
                  onClick={(e) => {
                    this.setState({ view: !this.state.view });
                    this.setState({ active: e.target.id });
                  }}
                >
                  {currency.symbol + currency.label}
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
