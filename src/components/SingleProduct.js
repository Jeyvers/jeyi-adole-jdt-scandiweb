import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleProductData } from '../slices/singleProductSlice';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
  }

  render() {
    return <div>SingleProduct</div>;
  }
}

const mapStateToProps = (state) => ({
  product: state,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProductData: (id) => dispatch(getSingleProductData(id)),
});

// export default withParams(SingleProduct);
export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
