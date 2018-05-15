import {
  ReducerFactory,
  Assing
} from '../lib/util';

import {
  GET_WORKERS_REQUEST,
  GET_WORKERS_SUCCESS
} from '../constants/action';

const DState = {
  workers: null,
  pending: false
};

const Actions = {

  [GET_WORKERS_REQUEST]:
    state =>
      Assing(state, { pending: true }),

  [GET_WORKERS_SUCCESS]:
    (state, { workers }) =>
      Assing(state, { workers, pending: false })

};

export default ReducerFactory(DState, Actions);

