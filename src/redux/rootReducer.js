import { combineReducers } from 'redux';

import taskList from './task/reducer';

const rootReducer = combineReducers({
  taskList,
});

export default rootReducer;
