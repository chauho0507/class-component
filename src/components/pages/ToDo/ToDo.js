import React, { Component } from 'react';

import TaskList from './TaskList/TaskList';

import { TaskContext } from '../../../store/task-context';

import { Col, Row, Card, Input, Form, Button } from 'antd';
import classes from './ToDo.module.css';

class ToDo extends Component {
  static contextType = TaskContext;

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
    this.context.addToList({
      id: Math.random() * 1000,
      ...values,
    });
  }

  componentDidMount() {
    this.context.getTaskList();
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
                      <Button type="primary" htmlType="submit">
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

export default ToDo;
