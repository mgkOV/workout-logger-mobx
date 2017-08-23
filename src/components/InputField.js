import React from 'react';
import PropTypes from 'prop-types';

//material-ui
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import { withStyles } from 'material-ui/styles';

let styles = {
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
  rootLabel: {
    color: '#fff'
  }
};

const InputField = ({ title, classes }) => {
  let { rootLabel, inkbar, underline, input } = classes;

  return (
    <FormControl style={{ marginTop: '15px' }} fullWidth>
      <InputLabel htmlFor="name-simple" classes={{ root: rootLabel }}>
        {title}
      </InputLabel>
      <Input id="name-simple" classes={{ inkbar, underline, input }} />
    </FormControl>
  );
};

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputField);
