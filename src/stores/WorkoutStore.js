import { observable, action, computed } from 'mobx';
import uuid from 'uuid/v4';

class WorkoutStore {
  @observable workouts = [];

  @action
  addNewWorkoutTitle = (workout, cb) => {
    const id = uuid();
    this.workouts.push({ id, title: workout, history: [] });
    cb(id);
    this.saveWorkout();
  };

  @action
  getWorkouts = () => {
    try {
      this.workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    } catch (e) {}
  };

  @action
  saveWorkout = () => {
    try {
      localStorage.setItem('workouts', JSON.stringify(this.workouts));
    } catch (e) {}
  };

  @action
  addWorkout = ({ id, date, repeats }) => {
    let idx = this.workouts.findIndex(w => {
      return w.id === id;
    });
    this.workouts[idx].history.push({
      date,
      repeats
    });
    this.saveWorkout();
  };

  @action
  deleteWorkout = (id, date) => {
    let idx = this.workouts.findIndex(w => w.id === id);
    let setIdx = this.workouts[idx].history.findIndex(h => h.date === date);
    this.workouts[idx].history.splice(setIdx, 1);
    this.saveWorkout();
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

// let workouts = [
//   {
//     id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
//     title: 'Жим штанги',
//     history: [
//       {
//         date: 1503503373020,
//         repeats: [10, 5, 8]
//       },
//       {
//         date: 1503504387020,
//         repeats: [10, 9, 9, 8, 10]
//       }
//     ]
//   },
//   {
//     id: '110ec58a-a0f2-4ac4-8393-c86345tb8d1',
//     title: 'Отжимания',
//     history: [
//       {
//         date: 1503503473020,
//         repeats: [15, 15, 18, 18]
//       },
//       {
//         date: 1503104589020,
//         repeats: [10, 19, 19, 18, 15]
//       }
//     ]
//   }
// ];
