import React, { PureComponent } from 'react';

import { Card, Row, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

import classes from './TaskItem.module.css';

class TaskItem extends PureComponent {
  render() {
    return (
      <li className={classes['task-item']}>
        <Card
          hoverable
          title={
            <Row justify="space-between">
              <Button type="primary">Edit</Button>
              <Button
                type="text"
                icon={<DeleteFilled style={{ color: 'red' }} />}
              />
            </Row>
          }
        >
          <Row>Title: {this.props.title}</Row>
          <Row>Description: {this.props.description}</Row>
        </Card>
      </li>
    );
  }
}

export default TaskItem;
