import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter, Alert } from 'reactstrap';

import SummaryScreen from './components/SummaryScreen'
import ActionButtons from './components/ActionButtons'
import CashActions from './components/CashActions'


// Cash Register
function App() {
  const [cash, setCash] = useState({
    "20": 0, "10": 0, "5": 0, "2": 0, "1": 0
  });
  const [actionsList, setActionsList] = useState({
    "add": false, "take": false, "change": false
  });
  const [message, setMessage] = useState("");

  const addCash = (bills) => {
    const result = {};
    
    Object.keys(cash).forEach(key => {
      if (bills.hasOwnProperty(key)) {
        if (actionsList.add)
          result[key] = cash[key] + bills[key];
        if (actionsList.take)
          result[key] = cash[key] - bills[key];

        if (result[key] < 0) result[key] = 0
      }
    });
   
    setCash(result);
  }
  
  const getChange = (changeCount) => {
    const result = {};

    Object.keys(cash).reverse().forEach(key => {
       result[key] = 0;
       let count = (changeCount - changeCount % key) / key;

       if (count) {
         result[key] = count > cash[key] ? cash[key] : count;
         changeCount = (changeCount - result[key] * key);
       }
     });
    
     if (changeCount === 0) {
       const newCash = {}
       Object.keys(cash).forEach(key => {
         if (result.hasOwnProperty(key))
            newCash[key] = cash[key] - result[key];
       });
       
       setCash(newCash);

       const infoMessage = Object.keys(result).map((key) => (`$${ key }×${ result[key] }`));
       setMessage(infoMessage.join('   '));
     }
     else {
      const totalCount = Object.keys(cash)
        .reduce((prev, key) => { return prev + (key * cash[key]) }, 0);

        if (totalCount < changeCount)
          setMessage(`Sorry, not enough cash (need $${ changeCount } more)`);
        else
          setMessage(`Sorry, needs more bills`);
     }
  }

  const toggleAction = (type = "") => {
    setMessage("");
    setActionsList({
      "add": false, "take": false, "change": false, 
      [type]: !actionsList[type]
    });
  }

  return (
    <Container style={{padding: "40px 0"}}>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Card outline color="primary" className="text-center">
            <CardBody><SummaryScreen cash={cash} /></CardBody>
            <CardFooter className="text-mutted">
              <ActionButtons actions={actionsList} toggleAction={ (type) => toggleAction(type) } />
            </CardFooter>
          </Card>
        </Col>
      </Row>

      {
        Object.values(actionsList).some( action => action ) ? 
          <CashActions actionsList={actionsList} 
            addCash={(data) => addCash(data)} getChange={(data) => getChange(data)} />
          : null
      }

      <Row hidden={ !message } style={{marginTop: "20px"}}>
        <Col sm={{ size: 6, offset: 3 }}>
          <Alert color="light" className="text-center">
            <code>{ message }</code>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
