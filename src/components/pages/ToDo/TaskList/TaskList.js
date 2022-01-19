import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskItem from '../TaskItem/TaskItem';

import classes from './TaskList.module.css';

class TaskList extends Component {
  render() {
    return (
      <ul className={classes['task-list']}>
        {this.props.taskList.map((task, idx) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { taskList, isLoading } = state;
  return {
    taskList: taskList.list,
    isLoading,
  };
};

export default connect(mapStateToProps)(TaskList);
