import { all } from 'redux-saga/effects';

import taskSaga from './task/tasks';

export default function* rootSaga() {
  yield all([taskSaga()]);
}
