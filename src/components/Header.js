import React, { Component } from 'react';
// material-ui
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { deepOrange } from 'material-ui/colors';
import BorderColor from 'material-ui-icons/BorderColor';

const styles = theme => ({
  rootClass: {
    width: '100%'
  },
  appBar: {
    backgroundColor: deepOrange[400]
  },
  iconLogo: {
    margin: '0 0 -5px 5px'
  }
});

@withStyles(styles)
class Header extends Component {
  render() {
    let { rootClass, appBar, iconLogo } = this.props.classes;

    return (
      <div className={rootClass}>
        <AppBar position="static" className={appBar}>
          <Toolbar>
            <Typography type="headline" color="inherit">
              Дневник Тренеровок <BorderColor className={iconLogo} />
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
