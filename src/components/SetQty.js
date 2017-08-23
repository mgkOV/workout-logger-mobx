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
  titleClass: {
    fontSize: '16px'
  }
};

@withStyles(styles)
class SetQty extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    repeats: PropTypes.number.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired
  };

  render() {
    let {
      title,
      repeats,
      increase,
      decrease,
      classes: { icons, qtyRoot, titleClass }
    } = this.props;
    return (
      <div>
        <Typography classes={{ root: qtyRoot }} type="subheading">
          <span className={titleClass}>
            {title}:
          </span>
        </Typography>
        <IconButton color="contrast" aria-label="Увеличить" onClick={increase}>
          <AddCircleOutline className={icons} />
        </IconButton>
        <Typography classes={{ root: qtyRoot }} type="subheading">
          {repeats}
        </Typography>
        <IconButton color="contrast" aria-label="Уменьшить" onClick={decrease}>
          <RemoveCircleOutline className={icons} />
        </IconButton>
      </div>
    );
  }
}

export default SetQty;
