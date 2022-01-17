import React, { Component } from 'react';

import TaskItem from '../TaskItem/TaskItem';

import { TaskContext } from '../../../../store/task-context';
import classes from './TaskList.module.css';

class TaskList extends Component {
  static contextType = TaskContext;
  render() {
    const taskCtx = this.context;
    return (
      <ul className={classes['task-list']}>
        {taskCtx.taskList.map((task, idx) => {
          return (
            <TaskItem
              key={task.id}
              // index={`# ${idx + 1}`}
              title={task.title}
              description={task.description}
            />
          );
        })}
      </ul>
    );
  }
}

export default TaskList;
