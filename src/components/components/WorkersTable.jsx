import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from '../../lib/util';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const WorkersTableHead = ({active, total}) => (
  <TableHead>
    <TableRow>
      <CustomTableCell>Name</CustomTableCell>
      <CustomTableCell>Пул</CustomTableCell>
      <CustomTableCell>
        Статус (активно {active} из {total})
      </CustomTableCell>
      <CustomTableCell>Хэшрейт (TH)</CustomTableCell>
    </TableRow>
  </TableHead>
);

const Row = ({classes, name, pool, hashrate}) => (
  <TableRow className={classes.row} key={name}>
    <CustomTableCell>{name}</CustomTableCell>
    <CustomTableCell>{pool}</CustomTableCell>
    <CustomTableCell>{hashrate > 0 ? 'активен' : 'выключен'}</CustomTableCell>
    <CustomTableCell>
      {parseFloat(Math.round(hashrate * 100) / 100).toFixed(2)}
    </CustomTableCell>
  </TableRow>
);

const BitcoinPoolAsics = ({workers, classes, status}) => (
  workers.bitcoinPool.filter(worker => {
    if (status === 'Все') {
      return true;
    } else if (status === 'активен') {
      return worker.hashrateNowTerahashes > 0
    } else {
      return worker.hashrateNowTerahashes === 0
    }
  }).map(worker => (
      <Row classes={classes}
           name={worker.workername}
           pool={'Bitcoin pool'}
           hashrate={worker.hashrateNowTerahashes}
      />
    )
  )
);

const SlushpoolAsics = ({workers, classes, status}) => (
  Object.keys(workers.slushPool).filter(worker => {
    if (status === 'Все') {
      return true;
    } else if (status === 'активен') {
      return workers.slushPool[worker].hashrate > 0
    } else {
      return workers.slushPool[worker].hashrate === 0
    }
  }).map(worker => (
      <Row classes={classes}
           name={worker}
           pool={'Slushpool'}
           hashrate={workers.slushPool[worker].hashrate}
      />
    )
  )
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class WorkersTable extends React.Component {

  state = {
    status: 'Все',
    pool: 'Все'
  };

  handleChangeStatusFilter = e => {
    this.setState({
      status: e.target.value
    });
  };

  handleChangePoolFilter = e => {
    this.setState({
      pool: e.target.value
    });
  };

  render() {
    const { classes, workers } = this.props;
    const { status, pool } = this.state;

    const bitcoinPoolTotal = workers.bitcoinPool.length;
    const bitcoinPoolActive = workers.bitcoinPool.filter(worker => worker.hashrateNowTerahashes > 0).length;

    const slushpoolTotal = Object.keys(workers.slushPool).length;
    const slushpoolActive = Object.keys(workers.slushPool).filter(worker => workers.slushPool[worker].hashrate > 0).length;

    let total = 0, active = 0;

    switch (pool) {
      case 'Bitcoin pool':
        total = bitcoinPoolTotal;
        active = bitcoinPoolActive;
        break;
      case 'Slushpool':
        total = slushpoolTotal;
        active = slushpoolActive;
        break;
      default:
        total = bitcoinPoolTotal + slushpoolTotal;
        active = bitcoinPoolActive + slushpoolActive;
    }

    switch (status) {
      case 'активен':
        total = active;
        break;
      case 'выключен':
        total -= active;
        active = 0;
        break;
      default:
    }

    return (
      <Paper className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel>Пул</InputLabel>
          <Select
            value={this.state.pool}
            onChange={this.handleChangePoolFilter}
          >
            <MenuItem value={'Все'}>Все</MenuItem>
            <MenuItem value={'Bitcoin pool'}>Bitcoin pool</MenuItem>
            <MenuItem value={'Slushpool'}>Slushpool</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={this.state.status}
            onChange={this.handleChangeStatusFilter}
          >
            <MenuItem value={'Все'}>Все</MenuItem>
            <MenuItem value={'активен'}>Активен</MenuItem>
            <MenuItem value={'выключен'}>Выключен</MenuItem>
          </Select>
        </FormControl>
        <Table className={classes.table}>
          <WorkersTableHead
            active={active}
            total={total}
          />
          <TableBody>
            {(pool === 'Все' || pool === 'Bitcoin pool') ?
              <BitcoinPoolAsics workers={workers} classes={classes} status={status}/>
              : <a/>
            }
            {(pool === 'Все' || pool === 'Slushpool') ?
              < SlushpoolAsics workers={workers} classes={classes} status={status}/>
              : <a/>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }

}

WorkersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles)
)(WorkersTable);