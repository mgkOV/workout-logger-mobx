import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// material-ui
import { withStyles } from 'material-ui/styles';
import AddCircle from 'material-ui-icons/AddCircle';
import Button from 'material-ui/Button';
import { deepOrange } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
// components
import Workouts from './Workouts';
import InputField from './InputField';
import SetQty from './SetQty';

let styles = theme => ({
  form: {
    margin: theme.spacing.unit
  },
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
  iconAdd: {
    marginLeft: '5px'
  }
});

@withStyles(styles)
class AddForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    let { form, paper, button, iconAdd } = this.props.classes;

    return (
      <Paper className={paper}>
        <Button raised className={button}>
          Добавить упражнение <AddCircle className={iconAdd} />
        </Button>
        <form className={form}>
          <Grid container direction="row" justify="center" align="center">
            <Grid item xs={12} sm={5}>
              <Workouts />
            </Grid>
            <Grid item xs={12} sm={7}>
              <SetQty />
            </Grid>
          </Grid>
          <InputField title="Название упражнения" />
        </form>
      </Paper>
    );
  }
}

export default AddForm;
