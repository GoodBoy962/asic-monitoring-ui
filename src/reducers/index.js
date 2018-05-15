import { routerReducer } from 'react-router-redux';

import UserInfoReducer from './userInfo';
import WorkersReducer from './workers';

export default {
  routing: routerReducer,

  userInfo: UserInfoReducer,
  workers: WorkersReducer
};