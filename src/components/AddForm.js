import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as PropTypesM } from 'mobx-react';
import { inject, observer } from 'mobx-react';

// material-ui
// import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AddCircle from 'material-ui-icons/AddCircle';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { deepOrange } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

// components
import Workouts from './Workouts';
import InputField from './InputField';
import SetQty from './SetQty';

let styles = theme => ({
  paper: {
    margin: '50px auto',
    width: '50%',
    minWidth: '260px',
    minHeight: '60px',
    backgroundColor: deepOrange[400],
    color: '#fff',
    textAlign: 'center',
    padding: '15px'
  },
  button: {
    margin: theme.spacing.unit,
    color: deepOrange[500],
    backgroundColor: '#fff'
  },
  form: {
    margin: theme.spacing.unit
  },
  iconShowTable: {
    marginLeft: '5px'
  },
  iconAddNewTitle: {
    width: '40px',
    height: '40px'
  }
});

@inject('WorkoutStore')
@observer
@withStyles(styles)
class AddForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    WorkoutStore: PropTypes.shape({
      workouts: PropTypesM.observableArray.isRequired,
      addNewWorkoutTitle: PropTypes.func.isRequired,
      addWorkout: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    repeats: [1], // array of repeats in sets in order
    acitivateNewTitle: false, // make active or not new workout in list of workouts
    showForm: false, // show or not add form
    showAddTitleInput: !this.props.WorkoutStore.workouts.length || false, // show or not add title input
    newWorkoutTitle: '', // new workout title from input
    activeWorkout: '' // active workout in list of all workouts
  };

  // render add new workout form
  renderForm = (form, iconAddNewTitle) =>
    !this.state.showForm
      ? ''
      : <form className={form} onSubmit={e => e.preventDefault()}>
          <Grid container direction="row" justify="center" align="center">
            <Grid item xs={12} sm={5}>
              <Workouts
                workouts={this.props.WorkoutStore.workouts}
                showNewTitleInput={this.showNewTitleInput}
                acitivateNewTitle={this.state.acitivateNewTitle}
                setActiveWorkout={this.setActiveWorkout}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              {this.state.showAddTitleInput
                ? <Grid
                    container
                    direction="row"
                    justify="center"
                    align="center"
                  >
                    <Grid item xs={10}>
                      <InputField
                        title="Название упражнения"
                        inputValue={this.state.newWorkoutTitle}
                        handleChange={this.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        color="contrast"
                        style={{ marginTop: '35px' }}
                        onClick={this.addNewTitle}
                      >
                        <AddCircle className={iconAddNewTitle} />
                      </IconButton>
                    </Grid>
                  </Grid>
                : <SetQty
                    title={'Кол-во подходов'}
                    repeats={this.state.repeats.length}
                    increase={this.increaseSets}
                    decrease={this.decreaseSets}
                  />}
            </Grid>
          </Grid>
          {this.state.showAddTitleInput
            ? ''
            : <div style={{ margin: '15px' }}>
                {this.state.repeats.map((r, i) =>
                  <SetQty
                    title={`Кол-во повторений в ${i + 1} подходе`}
                    repeats={r}
                    key={i}
                    increase={this.increaseRepeats(i)}
                    decrease={this.decreaseRepeats(i)}
                  />
                )}
                <Button
                  raised
                  className={this.props.classes.button}
                  onClick={this.handleSave}
                >
                  Сохранить{' '}
                  <AddCircle className={this.props.classes.iconShowTable} />
                </Button>
              </div>}
        </form>;

  // ******* save new workout to WorkoutStore *******
  handleSave = () => {
    let workout = {
      id: this.state.activeWorkout,
      date: Date.now(),
      repeats: this.state.repeats
    };

    this.props.WorkoutStore.addWorkout(workout);
    this.setState({
      repeats: [1],
      acitivateNewTitle: false,
      showForm: false,
      showAddTitleInput: false,
      newWorkoutTitle: ''
    });
  };

  // ******* set active workout *******
  setActiveWorkout = id => {
    if (id !== 'last') {
      this.setState({
        activeWorkout: id
      });
    }
  };

  // ******* set show or not form to add new workout to table  *******
  showForm = () => {
    this.setState({
      showForm: true
    });
  };

  // ******* set show or not new title input *******
  showNewTitleInput = show => {
    this.setState({
      showAddTitleInput: show
    });
  };

  // ******* add new workout title to WorkoutStore *******
  addNewTitle = () => {
    const setActiveWorkout = id => {
      this.setState({
        activeWorkout: id
      });
    };

    this.props.WorkoutStore.addNewWorkoutTitle(
      this.state.newWorkoutTitle,
      setActiveWorkout
    );
    this.setState(prevState => ({
      repeats: [1],
      acitivateNewTitle: true,
      showAddTitleInput: false,
      newWorkoutTitle: ''
    }));
  };

  // ******* set new workout title to this.store on InputField change *******
  handleInputChange = e => {
    this.setState({
      newWorkoutTitle: e.target.value
    });
  };

  // ******* increase quantity of sets *******
  increaseSets = () => {
    this.setState(prevState => ({
      repeats: [...prevState.repeats, 1]
    }));
  };

  // ******* decrease quantity of sets *******
  decreaseSets = () => {
    this.setState(prevState => ({
      repeats:
        prevState.repeats.length > 1
          ? prevState.repeats.slice(0, -1)
          : prevState.repeats
    }));
  };

  // ******* increase quantity of repeats in one set*******
  increaseRepeats = idx => () => {
    this.setState(prevState => {
      let newRepeats = [...prevState.repeats];
      newRepeats[idx] += 1;
      return {
        repeats: newRepeats
      };
    });
  };

  // ******* Decrease quantity of repeats in one set ********
  decreaseRepeats = idx => () => {
    this.setState(prevState => {
      let newRepeats = [...prevState.repeats];
      if (newRepeats[idx] > 1) {
        newRepeats[idx] -= 1;
      }
      return {
        repeats: newRepeats
      };
    });
  };

  //  ******* Render *******
  render() {
    let {
      form,
      paper,
      button,
      iconShowTable,
      iconAddNewTitle
    } = this.props.classes;

    return (
      <Paper className={paper}>
        {this.state.showForm
          ? ''
          : <Button raised className={button} onClick={this.showForm}>
              Добавить упражнение <AddCircle className={iconShowTable} />
            </Button>}
        {this.renderForm(form, iconAddNewTitle)}
      </Paper>
    );
  }
}

export default AddForm;
