import { Component } from 'react';
import { connect } from 'react-redux';

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.categories.map((category) => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
