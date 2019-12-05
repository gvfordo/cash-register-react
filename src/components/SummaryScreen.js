import React from 'react';
import { Row, Col } from 'reactstrap';

function SummaryScreen(props) {
  const cash = { ...props.cash };
  const total = Object.keys(cash).reduce((prev, key) => {
    return prev + key * cash[key];
  }, 0);

  return (
    <>
      <Row>
        <Col sm='12'>
          <h2>
            ${total}
            <small>.00</small>
          </h2>
        </Col>
      </Row>

      <Row noGutters>
        <Col sm='1'></Col>
        {Object.keys(cash).map(key => (
          <Col sm='2' key={key}>
            {cash[key]}&nbsp;&times;&nbsp;${key}
          </Col>
        ))}
        <Col sm='1'></Col>
      </Row>
    </>
  );
}

export default SummaryScreen;
