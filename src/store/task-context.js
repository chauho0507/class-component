import React, { Component } from 'react';

const DUMMY_TASKS = [
  {
    id: 't1',
    title: 'Class Component',
    description: 'Component lifecycle ,lifecycle methods',
  },
  {
    id: 't2',
    title: 'Pure Component',
    description:
      'What is Pure Component? Difference between Pure Component and Component?',
  },
];

export const TaskContext = React.createContext({
  taskList: [],
  getTaskList() {},
  addToList() {},
  removeFromList() {},
});

class TaskProvider extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
    };

    this.getTaskList = this.getTaskList.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  getTaskList() {
    setTimeout(() => {
      this.setState({
        taskList: DUMMY_TASKS,
      });
    }, 1000);
  }

  addToList(task) {
    this.setState(prevState => {
      return {
        taskList: [task, ...prevState.taskList],
      };
    });
  }

  removeFromList(taskId) {
    this.setState(prevState => {
      return {
        taskList: prevState.taskList.filter(task => task.id !== taskId),
      };
    });
  }

  render() {
    const { taskList } = this.state;
    const { getTaskList, addToList, removeFromList } = this;

    return (
      <TaskContext.Provider
        value={{ taskList, getTaskList, addToList, removeFromList }}
      >
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}

export default TaskProvider;
