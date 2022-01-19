import produce from 'immer';

import * as Types from '../../constants/actionTypes';

const initialState = {
  list: [],
  isLoading: false,
  getListFailed: undefined,

  actionLoading: {
    getTaskList: false,
    addTask: false,
    deleteTask: false,
    editTask: false,
  },
};

export default produce((state, { type, payload }) => {
  switch (type) {
    case Types.GET_TASKS_REQUEST:
      state.isLoading = true;
      state.list = [];
      state.getListFailed = null;
      state.actionLoading.getTaskList = true;
      return;
    case Types.GET_TASKS_SUCCESS:
      state.isLoading = false;
      state.list = payload;
      state.getListFailed = null;
      state.actionLoading.getTaskList = false;
      return;
    case Types.GET_TASKS_FAILED:
      state.isLoading = false;
      state.getListFailed = null;
      state.actionLoading.getTaskList = false;
      return;

    case Types.ADD_TASK_REQUEST:
      state.isLoading = true;
      state.actionLoading.addTask = true;
      return;
    case Types.ADD_TASK_SUCCESS:
      state.isLoading = false;
      state.list = [...state.list, payload];
      state.actionLoading.addTask = false;
      return;
    case Types.ADD_TASK_FAILED:
      state.isLoading = false;
      state.actionLoading.addTask = false;
      return;

    case Types.DELETE_TASK_REQUEST:
      state.isLoading = true;
      state.actionLoading.deleteTask = true;
      return;
    case Types.DELETE_TASK_SUCCESS:
      state.isLoading = false;
      state.list = state.list.filter(task => task.id !== payload);
      state.actionLoading.deleteTask = false;
      return;
    case Types.DELETE_TASK_FAILED:
      state.isLoading = false;
      state.actionLoading.deleteTask = false;
      return;

    case Types.EDIT_TASK_REQUEST:
      state.isLoading = true;
      state.actionLoading.editTask = true;
      return;
    case Types.EDIT_TASK_SUCCESS:
      state.isLoading = false;
      state.list = state.list.map(task =>
        task.id !== payload.id ? task : payload
      );
      state.actionLoading.editTask = false;
      return;
    case Types.EDIT_TASK_FAILED:
      state.isLoading = false;
      state.actionLoading.editTask = false;
      return;

    default:
      return;
  }
}, initialState);
