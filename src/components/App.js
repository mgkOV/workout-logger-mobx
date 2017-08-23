import React, { Component } from 'react';
import Header from './Header';
import AddForm from './AddForm';
import WorkoutTable from './WorkoutTable';
import { inject, observer } from 'mobx-react';

@inject('WorkoutStore')
@observer
class App extends Component {
  render() {
    let { WorkoutStore } = this.props;
    console.log(WorkoutStore.maxRepeat);
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
