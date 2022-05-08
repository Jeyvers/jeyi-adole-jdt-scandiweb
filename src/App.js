import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppWrapper from './AppWrapper';
import { store } from './store';

const appStore = store;

export class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <AppWrapper />
      </Provider>
    );
  }
}

export default App;
