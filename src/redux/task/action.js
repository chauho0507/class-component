import * as Types from '../constants/actionTypes';

export const getTaskList = () => ({ type: Types.GET_TASK_LIST });

export const addTask = () => ({ type: Types.ADD_TASK });
export const deleteTask = () => ({ type: Types.DELETE_TASK });
export const editTask = () => ({ type: Types.EDIT_TASK });
