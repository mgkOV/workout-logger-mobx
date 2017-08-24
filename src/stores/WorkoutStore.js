import { observable, action, computed } from 'mobx';
import uuid from 'uuid/v4';

let workouts = [
  {
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    title: 'Жим штанги',
    history: [
      {
        date: 1503503373020,
        repeats: [10, 5, 8]
      },
      {
        date: 1503504387020,
        repeats: [10, 9, 9, 8, 10]
      }
    ]
  },
  {
    id: '110ec58a-a0f2-4ac4-8393-c86345tb8d1',
    title: 'Отжимания',
    history: [
      {
        date: 1503503473020,
        repeats: [15, 15, 18, 18]
      },
      {
        date: 1503104589020,
        repeats: [10, 19, 19, 18, 15]
      }
    ]
  }
];

class WorkoutStore {
  @observable workouts = workouts;

  @action
  addNewWorkoutTitle = workout => {
    const id = uuid();
    this.workouts.push({ id, title: workout, history: [] });
  };

  @action
  addWorkout = workout => {
    let idx = this.workouts.indexOf(w => {
      return w.id === workout.id;
    });
    // this.workouts[idx].history.push(workout);
    console.log('++++', idx, this.workouts[1].id === workout.id);
  };

  @computed
  get maxRepeat() {
    let max = 0;
    for (let workout of this.workouts) {
      let { history } = workout;
      for (let i of history) {
        let length = i.repeats && i.repeats.length;
        max = length > max ? length : max;
      }
    }

    return max;
  }
}

const store = new WorkoutStore();
export default store;
