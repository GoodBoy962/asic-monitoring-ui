import api from '../lib/api';
import {
  GET_WORKERS_REQUEST,
  GET_WORKERS_SUCCESS
} from '../constants/action';

export function load() {

  return async function(dispatch) {

    dispatch({
      type: GET_WORKERS_REQUEST
    });

    const workers = await api.getWorkers();

    dispatch({
      type: GET_WORKERS_SUCCESS,
      workers
    });

  }

}