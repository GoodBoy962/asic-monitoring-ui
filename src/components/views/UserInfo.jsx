import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from '../../lib/util';
import { getInfo }  from '../../actions/userInfo';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    flexDirection: 'column'
  }
});

class UserInfo extends React.Component {

  componentWillMount() {
    this.props.getInfo();
  }

  render() {
    const { classes, info, pending } = this.props;
    return (
      <div className={classes.main}>
        {
          (!!pending || !info) ?
            <CircularProgress/>
            :
            <div>
              <h3>Bitcoin pool</h3>
              <h4>BTC</h4>
              <p>баланс: {info.bitcoinPool.bBTCData.balance}</p>
              <p>хэшрейт: {parseFloat(Math.round(info.bitcoinPool.bBTCData.hashrateAverage10min * 100) / 100).toFixed(2)} TH</p>
              <h4>BCH</h4>
              <p>баланс: {info.bitcoinPool.bBCHData.balance}</p>
              <p>хэшрейт: {parseFloat(Math.round(info.bitcoinPool.bBCHData.hashrateAverage10min * 100) / 100).toFixed(2)} TH</p>
              <br/>
              <h3>Slushpool</h3>
              <p>баланс: {info.slushPool.reward} </p>
              <p>хэшрейт: {parseFloat(Math.round(info.slushPool.hashrate * 100) / 100).toFixed(2)} TH</p>
            </div>
        }
      </div>
    )
  }

}

const mapStateToProps = state => ({
  info: state.userInfo.info,
  pending: state.userInfo.pending
});

const mapDispatchToProps = dispatch => ({
  getInfo: () => dispatch(getInfo())
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UserInfo)