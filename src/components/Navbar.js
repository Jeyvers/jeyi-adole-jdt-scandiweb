import { Component } from 'react';
import { BagIcon } from '../icons';

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.categories.map((category) => (
            <li
              key={category.name}
              onClick={() => this.props.getCategory(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <div className='brand-logo'>
          <span>
            <BagIcon />
          </span>
        </div>
      </nav>
    );
  }
}

export default Navbar;
