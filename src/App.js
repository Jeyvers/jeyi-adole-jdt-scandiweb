import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Products from './components/Products';
import Navbar from './components/Navbar';
import { getProducts } from './slices/productsSlice';
import { store } from './store';

const appStore = store;

export class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <Navbar />
        <Products />
      </Provider>
    );
  }
}

export default App;
