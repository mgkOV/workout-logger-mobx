import React, { Component } from 'react';
import Header from './Header';
import AddForm from './AddForm';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AddForm />
      </div>
    );
  }
}

export default App;
