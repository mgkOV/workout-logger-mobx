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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const WorkoutTable = props => {
  const { paper, rootTHead } = props.classes;

  return (
    <Paper className={paper}>
      <Table>
        <TableHead classes={{ root: rootTHead }}>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell>Упражнение</TableCell>
            <TableCell numeric>
              Кол-во в<br />1 походе
            </TableCell>
            <TableCell numeric>
              Кол-во в<br />2 походе
            </TableCell>
            <TableCell numeric>
              Кол-во в<br />3 походе
            </TableCell>
            <TableCell numeric>
              Кол-во в<br />4 походе
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>11.03.17</TableCell>
                <TableCell>
                  {n.name}
                </TableCell>
                <TableCell numeric>
                  {n.calories}
                </TableCell>
                <TableCell numeric>
                  {n.fat}
                </TableCell>
                <TableCell numeric>
                  {n.carbs}
                </TableCell>
                <TableCell numeric>
                  {n.protein}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

WorkoutTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WorkoutTable);
