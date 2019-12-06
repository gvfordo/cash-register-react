import React, { useReducer } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Alert
} from 'reactstrap';

import SummaryScreen from './components/SummaryScreen';
import ActionButtons from './components/ActionButtons';
import CashActions from './components/CashActions';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ACTION':
      return {
        ...state,
        actionsList: {
          ...initActionsList,
          [action.actionType]: !state.actionsList[action.actionType]
        },
        message: null
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message
      };
    case 'SET_CASH':
      return {
        ...state,
        cash: action.cash
      };
    default:
      return state;
  }
};

const initCash = {
  '1': 0,
  '2': 0,
  '5': 0,
  '10': 0,
  '20': 0
};
const initActionsList = {
  add: false,
  take: false,
  change: false
};

// Cash Register
function App() {
  const [state, dispatch] = useReducer(reducer, {
    cash: initCash,
    actionsList: initActionsList,
    message: null
  });
  const { cash, actionsList, message } = state;

  const addCash = bills => {
    const result = {};

    Object.keys(cash).forEach(key => {
      if (bills.hasOwnProperty(key)) {
        if (actionsList.add) result[key] = cash[key] + bills[key];
        if (actionsList.take) result[key] = cash[key] - bills[key];

        if (result[key] < 0) result[key] = 0;
      }
    });

    dispatch({
      type: 'SET_CASH',
      cash: result
    });
  };

  const getChange = changeCount => {
    const result = {};

    Object.keys(cash)
      .reverse()
      .forEach(key => {
        result[key] = 0;
        let count = (changeCount - (changeCount % key)) / key;

        if (count) {
          result[key] = count > cash[key] ? cash[key] : count;
          changeCount = changeCount - result[key] * key;
        }
      });

    if (changeCount === 0) {
      const newCash = {};
      Object.keys(cash).forEach(key => {
        if (result.hasOwnProperty(key)) newCash[key] = cash[key] - result[key];
      });

      dispatch({
        type: 'SET_CASH',
        cash: newCash
      });

      const infoMessage = Object.keys(result).map(
        key => `${result[key]}×$${key}`
      );

      dispatch({
        type: 'SET_MESSAGE',
        message: infoMessage.join(' ')
      });
    } else {
      const totalCount = Object.keys(cash).reduce((prev, key) => {
        return prev + key * cash[key];
      }, 0);

      if (totalCount < changeCount) {
        dispatch({
          type: 'SET_MESSAGE',
          message: `Sorry, not enough cash (need $${changeCount} more)`
        });
      } else {
        dispatch({
          type: 'SET_MESSAGE',
          message: `Sorry, needs more bills`
        });
      }
    }
  };

  return (
    <Container style={{ padding: '40px 0' }}>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Card outline color='primary' className='text-center'>
            <CardBody>
              <SummaryScreen cash={cash} />
            </CardBody>
            <CardFooter className='text-mutted'>
              <ActionButtons
                actions={actionsList}
                toggleAction={type =>
                  dispatch({
                    type: 'TOGGLE_ACTION',
                    actionType: type
                  })
                }
              />
            </CardFooter>
          </Card>
        </Col>
      </Row>

      {Object.values(actionsList).some(action => action) ? (
        <CashActions
          actionsList={actionsList}
          addCash={data => addCash(data)}
          getChange={data => getChange(data)}
        />
      ) : null}

      {message ? (
        <Row style={{ marginTop: '20px' }}>
          <Col sm={{ size: 6, offset: 3 }}>
            <Alert color='light' className='text-center'>
              <code id='register-message'>{message}</code>
            </Alert>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default App;
