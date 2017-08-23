import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import Typography from 'material-ui/Typography';

let styles = {
  qtyRoot: {
    color: '#fff',
    fontSize: '30px',
    display: 'inline-block',
    position: 'relative',
    bottom: '11px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  icons: {
    width: '45px',
    height: '45px'
  },
  title: {
    fontSize: '16px'
  }
};

@withStyles(styles)
class SetQty extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    qty: 1
  };

  increaseQty = () => {
    this.setState(prevState => ({
      qty: prevState.qty + 1
    }));
  };

  decreaseQty = () => {
    this.setState(prevState => {
      return {
        qty: prevState.qty <= 0 ? 0 : prevState.qty - 1
      };
    });
  };

  render() {
    let { icons, qtyRoot, title } = this.props.classes;
    return (
      <div>
        <Typography classes={{ root: qtyRoot }} type="subheading">
          <span className={title}>Кол-во подходов: </span>
        </Typography>
        <IconButton
          color="contrast"
          aria-label="Увеличить"
          onClick={this.increaseQty}
        >
          <AddCircleOutline className={icons} />
        </IconButton>
        <Typography classes={{ root: qtyRoot }} type="subheading">
          {this.state.qty}
        </Typography>
        <IconButton
          color="contrast"
          aria-label="Уменьшить"
          onClick={this.decreaseQty}
        >
          <RemoveCircleOutline className={icons} />
        </IconButton>
      </div>
    );
  }
}

export default SetQty;
