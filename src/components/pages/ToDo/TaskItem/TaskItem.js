import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { Card, Row, Button, Drawer, Form, Input, Col } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import * as Types from '../../../../constants/actionTypes';

import classes from './TaskItem.module.css';

class TaskItem extends PureComponent {
  editFormRef = React.createRef();
  constructor() {
    super();
    this.state = {
      isEdit: false,
      initFormValues: {},
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  toggleEdit() {
    this.setState(() => {
      return {
        isEdit: !this.state.isEdit,
        initFormValues: {
          id: this.props.id,
          title: this.props.title,
          description: this.props.description,
        },
      };
    });
  }

  submitHandler(values) {
    console.log(values);
    this.props.editTask({
      data: values,
      callback: {
        toggleEdit: this.toggleEdit,
      },
    });
  }

  render() {
    console.log(`Render! ${this.props.id}`);
    return (
      <li className={classes['task-item']}>
        <Card
          hoverable
          title={
            <Row justify="space-between">
              <Button type="primary" onClick={this.toggleEdit}>
                Edit
              </Button>
              <Button
                type="text"
                icon={<DeleteFilled style={{ color: 'red' }} />}
                onClick={() => this.props.deleteTask(this.props.id)}
              />
            </Row>
          }
          headStyle={{ backgroundColor: 'lightGray' }}
        >
          <Row>Title: {this.props.title}</Row>
          <Row>Description: {this.props.description}</Row>
        </Card>
        <Drawer
          title={this.props.title}
          placement="right"
          onClose={this.toggleEdit}
          visible={this.state.isEdit}
        >
          <Form
            ref={this.editFormRef}
            name="Edit-form"
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 17 }}
            onFinish={this.submitHandler}
            initialValues={this.state.initFormValues}
          >
            <Form.Item
              name="title"
              label="Title"
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
              rules={[{ required: true, message: 'Not an empty description!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="id">
              <span style={{ display: 'none' }}>
                {this.state.initFormValues.id}
              </span>
            </Form.Item>
            <Row align="middle">
              <Col offset={7} span={4}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.actionLoading.editTask}
                >
                  Ok
                </Button>
              </Col>
              <Col offset={2} span={4}>
                <Button danger ghost onClick={this.toggleEdit}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </li>
    );
  }
}

const mapStateToProps = state => {
  const { taskList } = state;

  return {
    actionLoading: taskList.actionLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTask: taskId =>
      dispatch({
        type: Types.DELETE_TASK_REQUEST,
        payload: taskId,
      }),
    editTask: task =>
      dispatch({
        type: Types.EDIT_TASK_REQUEST,
        payload: task,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
