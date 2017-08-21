import React, { Component } from 'react';
import classNames from 'classnames';
// material-ui
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
// components
import Workouts from './Workouts';

let styles = theme => ({
  inkbar: {
    '&:after': {
      backgroundColor: '#fff'
    },
    '&:before': {
      backgroundColor: 'rgba(255, 255, 255, 0.42)'
    }
  },
  underline: {
    '&:before': {
      backgroundColor: '#fff'
    },
    '&:hover:before': {
      backgroundColor: 'rgba(255, 255, 255, 0.42) !important'
    }
  },
  input: {
    color: '#fff'
  },
  formControl: {
    marginBottom: theme.spacing.unit
  },
  form: {
    margin: theme.spacing.unit
  },
  inputLabel: {
    color: '#fff'
  }
});

@withStyles(styles)
class AddForm extends Component {
  render() {
    let {
      form,
      formControl,
      inputLabel,
      inkbar,
      underline,
      input
    } = this.props.classes;
    return (
      <form className={form}>
        <Workouts />
        <FormControl className={formControl} fullWidth>
          <InputLabel htmlFor="name-simple" className={inputLabel}>
            Кол-во подходов
          </InputLabel>
          <Input
            id="name-simple"
            className={classNames(inkbar, underline, input)}
          />
        </FormControl>
        <FormControl className={formControl}>
          <InputLabel htmlFor="name-simple" className={inputLabel}>
            Кол-во повторений
          </InputLabel>
          <Input
            id="name-simple"
            className={classNames(inkbar, underline, input)}
          />
        </FormControl>
      </form>
    );
  }
}

export default AddForm;
