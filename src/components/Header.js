import React, { Component } from 'react';
// material-ui
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { deepOrange } from 'material-ui/colors';
import Button from 'material-ui/Button';
import BorderColor from 'material-ui-icons/BorderColor';
import AddCircle from 'material-ui-icons/AddCircle';
// components
import AddForm from './AddForm';

const styles = theme => ({
  rootClass: {
    width: '100%'
  },
  appBar: {
    backgroundColor: deepOrange[400]
  },
  iconLogo: {
    margin: '0 0 -5px 5px'
  },
  paper: {
    margin: '50px auto',
    width: '50%',
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
class Header extends Component {
  render() {
    let {
      rootClass,
      appBar,
      iconLogo,
      paper,
      button,
      iconAdd
    } = this.props.classes;

    return (
      <div className={rootClass}>
        <AppBar position="static" className={appBar}>
          <Toolbar>
            <Typography type="headline" color="inherit">
              Дневник Тренеровок <BorderColor className={iconLogo} />
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={paper}>
          <Button raised className={button}>
            Добавить упражнение <AddCircle className={iconAdd} />
          </Button>
          <AddForm />
        </Paper>
      </div>
    );
  }
}

export default Header;
