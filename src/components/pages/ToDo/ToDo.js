import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, Input, Form, Button, Drawer } from 'antd';

import TaskList from './TaskList/TaskList';

import * as Types from '../../../constants/actionTypes';

import classes from './ToDo.module.css';

class ToDo extends Component {
  taskFormRef = React.createRef();

  constructor() {
    super();
    this.state = {
      isEdit: false,
    };

    this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  toggleTaskForm() {
    this.setState(prevState => {
      return {
        isEdit: !prevState.isEdit,
      };
    });
  }

  submitHandler(values) {
    this.props.addTask({
      data: values,
      callback: {
        clearFields: () => {
          this.taskFormRef.current.resetFields();
        },
      },
    });
  }

  componentDidMount() {
    this.props.getTaskList();
  }

  render() {
    return (
      <div className={classes['todo-container']}>
        <Card>
          {!this.state.isEdit ? (
            <Button type="primary" block onClick={this.toggleTaskForm}>
              Add task
            </Button>
          ) : (
            <Row>
              <Col offset={2} span={20}>
                <Form
                  ref={this.taskFormRef}
                  name="task-form"
                  labelCol={{ offset: 2, span: 4 }}
                  wrapperCol={{ offset: 1, span: 12 }}
                  onFinish={this.submitHandler}
                >
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        min: 6,
                        max: 20,
                        message:
                          'Your title too short or too long! Enter a valid title pls',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { required: true, message: 'Not an empty description!' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Row align="middle" gutter={16}>
                    <Col span={12}>
                      <Row justify="end">
                        <Button
                          type="danger"
                          ghost
                          onClick={this.toggleTaskForm}
                        >
                          Cancel
                        </Button>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={this.props.actionLoading.addTask}
                      >
                        Ok
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
        </Card>

        <Card>
          <TaskList />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { taskList } = state;
  return {
    taskList: taskList.list,
    actionLoading: taskList.actionLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTaskList: () => dispatch({ type: Types.GET_TASKS_REQUEST }),
    addTask: task => dispatch({ type: Types.ADD_TASK_REQUEST, payload: task }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
