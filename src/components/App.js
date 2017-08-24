import React, { Component } from 'react';
import Header from './Header';
import AddForm from './AddForm';
import WorkoutTable from './WorkoutTable';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AddForm />
        <WorkoutTable />
      </div>
    );
  }
}

export default App;
