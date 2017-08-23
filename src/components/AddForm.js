import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    classes: PropTypes.object.isRequired
  };

  state = {
    repeats: [],
    newTitle: false,
    showForm: false
  };

  renderForm = (form, iconAddNewTitle) =>
    !this.state.showForm
      ? ''
      : <form className={form}>
          <Grid container direction="row" justify="center" align="center">
            <Grid item xs={12} sm={5}>
              <Workouts
                workouts={this.props.workouts}
                showNewTitle={this.showNewTitle}
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
                      <InputField title="Название упражнения" />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        color="contrast"
                        style={{ marginTop: '35px' }}
                      >
                        <AddCircle className={iconAddNewTitle} />
                      </IconButton>
                    </Grid>
                  </Grid>
                : <SetQty />}
            </Grid>
          </Grid>
        </form>;

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
        <Button raised className={button} onClick={this.showForm}>
          Добавить упражнение <AddCircle className={iconShowTable} />
        </Button>
        {this.renderForm(form, iconAddNewTitle)}
      </Paper>
    );
  }
}

export default AddForm;
