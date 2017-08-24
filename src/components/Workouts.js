import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as PropTypesM } from 'mobx-react';

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

@withStyles(styles)
class Workouts extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    workouts: PropTypesM.observableArray.isRequired,
    showNewTitleInput: PropTypes.func.isRequired,
    setActiveWorkout: PropTypes.func.isRequired,
    acitivateNewTitle: PropTypes.bool.isRequired
  };

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: !this.acitivateNewTitle ? 1 : this.props.workouts.length - 2
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, id) => {
    this.setState({ selectedIndex: index, open: false });
    this.props.showNewTitleInput(id === 'last');
    this.props.setActiveWorkout(id);
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {}

  render() {
    const { root, text } = this.props.classes;
    const workouts = [...this.props.workouts];

    workouts.push({
      title: 'Добавить упражнение',
      id: 'last'
    });

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
              secondary={workouts[this.state.selectedIndex].title}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {workouts.map((w, index) =>
            <MenuItem
              key={w.id}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index, w.id)}
            >
              {w.title}
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default Workouts;
