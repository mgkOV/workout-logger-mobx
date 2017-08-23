import React from 'react';
import PropTypes from 'prop-types';
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

const renderTableHead = repeats => {
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

const renderTableBody = (workouts, repeats) => {
  let rows = [];

  workouts.forEach(w => {
    w.history.forEach(h => {
      let dateString = new Date(h.date).toLocaleString('ru').slice(0, 10);

      let repeatCells = h.repeats.map((qty, idx) =>
        <TableCell numeric key={dateString + idx}>
          {qty}
        </TableCell>
      );

      if (repeatCells.length < repeats) {
        for (let i = repeatCells.length; i < repeats; i++) {
          repeatCells.push(
            <TableCell numeric key={dateString + i}>
              -
            </TableCell>
          );
        }
      }

      rows.push(
        <TableRow key={h.date}>
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

  return rows;
};

const WorkoutTable = ({ workouts, repeats, classes: { paper, rootTHead } }) => {
  return (
    <Paper className={paper}>
      <Table>
        <TableHead classes={{ root: rootTHead }}>
          {renderTableHead(repeats)}
        </TableHead>
        <TableBody>
          {renderTableBody(workouts, repeats)}
        </TableBody>
      </Table>
    </Paper>
  );
};

WorkoutTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WorkoutTable);
