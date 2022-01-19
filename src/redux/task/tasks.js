import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import * as Types from '../../constants/actionTypes';

function* getTaskListSaga(action) {
  try {
    const response = yield axios.get(
      'https://react-api-db6bf-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
    );
    const tasksDictionary = yield response.data;
    const tasks = Object.keys(tasksDictionary).map(id => {
      return { id, ...tasksDictionary[id] };
    });

    yield put({
      type: Types.GET_TASKS_SUCCESS,
      payload: tasks,
    });
  } catch (err) {
    yield put({
      type: Types.GET_TASKS_FAILED,
      payload: { err },
    });
  }
}

function* addTaskSaga({ payload }) {
  const { data, callback } = payload;
  try {
    const response = yield axios.post(
      'https://react-api-db6bf-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      data
    );

    yield put({
      type: Types.ADD_TASK_SUCCESS,
      payload: { id: response.data.name, ...data },
    });
    yield callback.clearFields();
  } catch (err) {
    yield put({
      type: Types.ADD_TASK_FAILED,
      payload: { err },
    });
  }
}

function* deleteTaskSaga({ payload }) {
  try {
    const response = yield axios.delete(
      `https://react-api-db6bf-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${payload}.json`
    );
    yield console.log(response);

    yield put({
      type: Types.DELETE_TASK_SUCCESS,
      payload,
    });
  } catch (err) {
    yield put({
      type: Types.DELETE_TASK_FAILED,
      payload: { err },
    });
  }
}
function* editTaskSaga({ payload }) {
  try {
    const { data, callback } = payload;
    yield axios.put(
      `https://react-api-db6bf-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${data.id}.json`,
      data
    );

    yield callback.toggleEdit();
    yield put({
      type: Types.EDIT_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    yield put({
      type: Types.EDIT_TASK_FAILED,
      payload: { err },
    });
  }
}

export default function* taskSaga() {
  yield takeLatest(Types.GET_TASKS_REQUEST, getTaskListSaga);
  yield takeLatest(Types.ADD_TASK_REQUEST, addTaskSaga);
  yield takeLatest(Types.DELETE_TASK_REQUEST, deleteTaskSaga);
  yield takeLatest(Types.EDIT_TASK_REQUEST, editTaskSaga);
}
