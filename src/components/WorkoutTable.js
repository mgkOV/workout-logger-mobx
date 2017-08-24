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

const styles = theme => ({
  paper: {
    width: '80%',
    minWidth: '260px',
    margin: `${theme.spacing.unit * 3}px auto`,
    overflowX: 'auto'
  },
  rootTHead: {
    color: deepOrange[500]
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
        <TableCell numeric key={i}>
          Кол-во в<br />
          {i} походе
        </TableCell>
      );
    }
    return (
      <TableRow>
        <TableCell>Дата</TableCell>
        <TableCell>Упражнение</TableCell>
        {tCells}
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
          <TableCell numeric key={dateString + idx}>
            {qty}
          </TableCell>
        );
        // add empty cells
        if (repeatCells.length < repeats) {
          for (let i = repeatCells.length; i < repeats; i++) {
            repeatCells.push(
              <TableCell numeric key={dateString + i}>
                -
              </TableCell>
            );
          }
        }
        // add row of table
        rows.push(
          <TableRow key={h.date} hover>
            <TableCell>
              {dateString}
            </TableCell>
            <TableCell>
              {w.title}
            </TableCell>
            {repeatCells}
          </TableRow>
        );
      });
    });

    // return rows of table
    return rows;
  };

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
