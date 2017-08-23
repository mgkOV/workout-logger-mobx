import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as PropTypesM } from 'mobx-react';
// import classNames from 'classnames';

// material-ui
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

@withStyles(styles)
class AddForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    workouts: PropTypesM.observableArray.isRequired,
    addNewWorkoutTitle: PropTypes.func.isRequired,
    addWorkout: PropTypes.func.isRequired
  };

  state = {
    repeats: [1],
    acitivateNewTitle: false,
    showForm: false,
    newTitle: false,
    workoutTitle: '',
    activeTitle: ''
  };

  renderForm = (form, iconAddNewTitle) =>
    !this.state.showForm
      ? ''
      : <form className={form} onSubmit={e => e.preventDefault()}>
          <Grid container direction="row" justify="center" align="center">
            <Grid item xs={12} sm={5}>
              <Workouts
                workouts={this.props.workouts}
                showNewTitle={this.showNewTitle}
                acitivateNewTitle={this.state.acitivateNewTitle}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              {this.state.newTitle
                ? <Grid
                    container
                    direction="row"
                    justify="center"
                    align="center"
                  >
                    <Grid item xs={10}>
                      <InputField
                        title="Название упражнения"
                        inputValue={this.state.workoutTitle}
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
          {this.state.newTitle
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
              </div>}
          <Button
            raised
            className={this.props.classes.button}
            onClick={this.handleSave}
          >
            Сохранить <AddCircle className={this.props.classes.iconShowTable} />
          </Button>
        </form>;

  handleSave = () => {
    let workout = {
      id: '',
      date: Date.now(),
      repeats: this.state.repeats
    };
    this.props.addWorkout(workout);
    this.setState({
      repeats: [1],
      acitivateNewTitle: false,
      showForm: false,
      newTitle: false,
      workoutTitle: ''
    });
  };

  showForm = () => {
    this.setState({
      showForm: true
    });
  };

  showNewTitle = show => {
    this.setState({
      newTitle: show
    });
  };

  addNewTitle = () => {
    this.props.addNewWorkoutTitle(this.state.workoutTitle);
    this.setState(prevState => ({
      acitivateNewTitle: true,
      newTitle: false,
      workoutTitle: ''
    }));
  };

  handleInputChange = e => {
    this.setState({
      workoutTitle: e.target.value
    });
  };

  increaseSets = () => {
    this.setState(prevState => ({
      repeats: [...prevState.repeats, 1]
    }));
  };

  decreaseSets = () => {
    this.setState(prevState => ({
      repeats:
        prevState.repeats.length > 1
          ? prevState.repeats.slice(0, -1)
          : prevState.repeats
    }));
  };

  increaseRepeats = idx => () => {
    this.setState(prevState => {
      let newRepeats = [...prevState.repeats];
      newRepeats[idx] += 1;
      return {
        repeats: newRepeats
      };
    });
  };

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
