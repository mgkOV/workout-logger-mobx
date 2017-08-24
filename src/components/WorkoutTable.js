import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { PropTypes as PropTypesM } from 'mobx-react';
//material-ui
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { deepOrange } from 'material-ui/colors';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  paper: {
    width: '80%',
    minWidth: '260px',
    margin: `${theme.spacing.unit * 3}px auto`,
    overflowX: 'auto'
  },
  rootTHead: {
    color: deepOrange[500]
  },
  paddingCell: {
    padding: '0 10px'
  }
});

@inject('WorkoutStore')
@observer
class WorkoutTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    WorkoutStore: PropTypes.shape({
      workouts: PropTypesM.observableArray.isRequired,
      maxRepeat: PropTypes.number.isRequired
    }).isRequired
  };

  //******** Table Head ********
  renderTableHead = repeats => {
    let tCells = [];
    for (let i = 1; i <= repeats; i++) {
      tCells.push(
        <TableCell
          numeric
          key={i}
          classes={{ padding: this.props.classes.paddingCell }}
        >
          Кол-во в<br />
          {i} походе
        </TableCell>
      );
    }
    return (
      <TableRow>
        <TableCell classes={{ padding: this.props.classes.paddingCell }}>
          Дата
        </TableCell>
        <TableCell classes={{ padding: this.props.classes.paddingCell }}>
          Упражнение
        </TableCell>
        {tCells}
        <TableCell classes={{ padding: this.props.classes.paddingCell }} />
      </TableRow>
    );
  };

  //******** Table BODY ********
  renderTableBody = (workouts, repeats) => {
    // init rows of table
    let rows = [];

    workouts.forEach(w => {
      w.history.forEach(h => {
        let dateString = new Date(h.date).toLocaleString('ru').slice(0, 10);
        // create cells with quantity of each repeat
        let repeatCells = h.repeats.map((qty, idx) =>
          <TableCell
            numeric
            key={dateString + idx}
            classes={{ padding: this.props.classes.paddingCell }}
          >
            {qty}
          </TableCell>
        );
        // add empty cells
        if (repeatCells.length < repeats) {
          for (let i = repeatCells.length; i < repeats; i++) {
            repeatCells.push(
              <TableCell
                numeric
                key={dateString + i}
                classes={{ padding: this.props.classes.paddingCell }}
              >
                -
              </TableCell>
            );
          }
        }
        // add row of table
        rows.push(
          <TableRow key={h.date} hover>
            <TableCell classes={{ padding: this.props.classes.paddingCell }}>
              {dateString}
            </TableCell>
            <TableCell classes={{ padding: this.props.classes.paddingCell }}>
              {w.title}
            </TableCell>
            {repeatCells}
            <TableCell classes={{ padding: this.props.classes.paddingCell }}>
              <IconButton
                aria-label="Delete"
                onClick={this.handleDelete(w.id, h.date)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
    });

    // return rows of table
    return rows;
  };

  // ******* delete workout from table *******
  handleDelete = (workoutId, historyDate) => () =>
    this.props.WorkoutStore.deleteWorkout(workoutId, historyDate);

  // ******** Render ********
  render() {
    const {
      WorkoutStore: { workouts, maxRepeat },
      classes: { paper, rootTHead }
    } = this.props;

    return (
      <Paper className={paper}>
        <Table>
          <TableHead classes={{ root: rootTHead }}>
            {this.renderTableHead(maxRepeat)}
          </TableHead>
          <TableBody>
            {this.renderTableBody(workouts, maxRepeat)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(WorkoutTable);
