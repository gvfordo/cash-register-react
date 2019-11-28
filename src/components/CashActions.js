import React, { useState } from 'react';
import { Row, Col, Input, InputGroupAddon, InputGroup, Button, Card, CardBody } from 'reactstrap';

function CashActions(props) {
  return ( 
    <Row>
      <Col sm={{ size: 6, offset: 3 }}>
        <Card outline color="secondary" className="text-center" style={{marginTop: "20px"}}>
          <CardBody style={{paddingBottom: '4px'}}>
            { (props.actionsList.add) ? <CashMovement addCash={props.addCash} action="add" /> : null}
            { (props.actionsList.take) ? <CashMovement addCash={props.addCash} action="take" /> : null}
            { (props.actionsList.change) ? <CashChange getChange={props.getChange} /> : null}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

function CashMovement(props) {
  const [bills, setBills] = useState({
    "20": 0, "10": 0, "5": 0, "2": 0, "1": 0
  });
  
  const addCash = (type = "", count = 0) => {
    setBills({
      ...bills,
      [type]: parseInt(count) || 0
    })
  };
  
  return ( 
    <Row>
      { 
        Object.keys(bills).map((key) => (
          <Col sm="4" key={key} className="form-group">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">{ `$` + key }</InputGroupAddon>
              <Input type="number" value={ bills[key] } onChange={ e => addCash(key, e.target.value) } />
            </InputGroup>
          </Col>
        ))
      }
      <Col sm="4" className="form-group">
        <Button size="sm" color="success" block 
          onClick={ () => props.addCash(bills) }>{ props.action.toUpperCase() }</Button>
      </Col>
    </Row>
  );
}

function CashChange(props) {
  const [cashCount, setCashCount] = useState(0);
  
  const handleChange = (value = 0) => {
    const count = parseInt(value) || 0;
    setCashCount(Math.abs(count));
  };
  
  return ( 
    <Row>
      <Col sm={{size: 4, offset: 2}} className="form-group">
        <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input type="number" value={ cashCount } onChange={ e => handleChange(e.target.value) } />
        </InputGroup>
      </Col>
      <Col sm="4" className="form-group">
        <Button size="sm" color="success" block onClick={ () => props.getChange(cashCount) }>CHANGE</Button>
      </Col>
    </Row>
  );
}

export default CashActions;