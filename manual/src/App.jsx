import React from 'react';
import { createStore } from 'redux';
import {
  useReduxDispatch,
  useReduxState,
  ReduxProvider
} from 'reactive-react-redux';

const initialState = {
  counter: 0,
  text: 'hello',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        counter: state.counter + 1
      };
    case 'decrement':
      return {
        ...state,
        counter: state.counter - 1
      };
    case 'setText':
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const Counter = (props) => {

  return (
    <div>
      {Math.random()}
      <div>
        <span>Count:{state.counter}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

const TextBox = (props, state, dispatch) => {

  return (
    <div>
      {Math.random()}
      <div>
        <span>Text:{state.text}</span>
        <input value={state.text} onChange={event => dispatch({
          type: 'setText',
          text: event.target.value
        })}/>
      </div>
    </div>
  );
};

const App = () => (
  <ReduxProvider store={store}>
    <h1>Counter</h1>
    <Counter/>
    <Counter/>
    <h1>TextBox</h1>
    <TextBox/>
    <TextBox/>
  </ReduxProvider>
);

export default App;
