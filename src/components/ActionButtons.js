import React from 'react';
import { Row, Col, Button } from 'reactstrap';

function ActionButtons(props) {
  return (
    <Row>
      <Col sm='4'>
        <Button
          outline
          color='primary'
          block
          onClick={() => props.toggleAction('add')}
          active={props.actions.add}
        >
          ADD
        </Button>
      </Col>
      <Col sm='4'>
        <Button
          outline
          color='primary'
          block
          onClick={() => props.toggleAction('take')}
          active={props.actions.take}
        >
          TAKE
        </Button>
      </Col>
      <Col sm='4'>
        <Button
          outline
          color='primary'
          block
          onClick={() => props.toggleAction('change')}
          active={props.actions.change}
        >
          CHANGE
        </Button>
      </Col>
    </Row>
  );
}

export default ActionButtons;
