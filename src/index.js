import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import 'typeface-roboto';
import './css/main.css';
import WorkoutStore from './stores/WorkoutStore';

WorkoutStore.getWorkouts();

const Root = (
  <Provider WorkoutStore={WorkoutStore}>
    <App />
  </Provider>
);

render(Root, document.getElementById('root'));
