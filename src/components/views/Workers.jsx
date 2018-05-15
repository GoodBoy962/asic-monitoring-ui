import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from '../../lib/util';
import CircularProgress from '@material-ui/core/CircularProgress';

import { load } from '../../actions/workers';
import WorkersTable from '../components/WorkersTable';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class Workers extends React.Component {

  componentWillMount() {
    this.props.load();
  }

  render() {
    const { pending, workers } = this.props;
    if (!pending && workers) {
      return <WorkersTable workers={ workers }/>
    } else {
      return <CircularProgress/>
    }
  }

}

Workers.propTypes = {
  classes: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
  workers: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(load())
});

const mapStateToProps = state => ({
  pending: state.workers.pending,
  workers: state.workers.workers
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Workers);