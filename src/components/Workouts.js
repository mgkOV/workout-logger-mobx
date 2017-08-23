import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import { deepOrange } from 'material-ui/colors';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  },
  text: {
    color: deepOrange[500]
  }
});

const options = ['Жим штанги от груди', 'Отжимния', 'Тяги к груди'];

@withStyles(styles)
class Workouts extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 1
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { root, text } = this.props.classes;
    return (
      <div className={root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Выбирете упражнение"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              classes={{ text }}
              primary="Выбирете упражнение"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) =>
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default Workouts;
