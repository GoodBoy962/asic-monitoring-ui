import api from '../lib/api';
import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS
} from '../constants/action';

export function getInfo() {

  return async function(dispatch) {

    dispatch({
      type: USER_INFO_REQUEST
    });

    const info = await api.getUserInfo();

    dispatch({
      type: USER_INFO_SUCCESS,
      info
    });

  }

}