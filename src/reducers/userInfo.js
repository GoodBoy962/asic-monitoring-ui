import {
  ReducerFactory,
  Assing
} from '../lib/util';

import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS
} from '../constants/action';

const DState = {
  info: null,
  pending: false
};

const Actions = {

  [USER_INFO_REQUEST]:
    state =>
      Assing(state, { pending: true }),

  [USER_INFO_SUCCESS]:
    (state, { info }) =>
      Assing(state, { info, pending: false })

};

export default ReducerFactory(DState, Actions);

