import React, { Component } from 'react';
import Header from './Header';
import AddForm from './AddForm';
import WorkoutTable from './WorkoutTable';
import { inject, observer } from 'mobx-react';

@inject('WorkoutStore')
@observer
class App extends Component {
  render() {
    let { WorkoutStore: { workouts, maxRepeat } } = this.props;
    return (
      <div>
        <Header />
        <AddForm />
        <WorkoutTable repeats={maxRepeat} workouts={workouts} />
      </div>
    );
  }
}

export default App;
