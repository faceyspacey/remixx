import React, { Component } from 'react';
//
// const Test = (props, state, actions) => <div>Test Component</div>;
//
// const TestTwo = (props, state, actions) => {
//   console.log('peace redux')
//   return (<div>{state.title}</div>)
// };
//
//
// const TestThree = (props, state, actions) => (
//   <button onClick={() => dispatch({
//     type: 'fake',
//     payload: 'nothin',
//   })}
//   >test
//   </button>
// );
//
// function TestFour(props, state, actions) {
//   return (<div>testin</div>)
// }
//
// const TestFive = function(props, state, actions) {
//   return (<div>testn</div>)
// }

const Counter = (props, state, actions) => {
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
//
// const TextBox = (props, state, actions) => {
//   return (
//     <div>
//       {Math.random()}
//       <div>
//         <span>Text:{state.text}</span>
//         <input value={state.text} onChange={event => dispatch({ type: 'setText', text: event.target.value })} />
//       </div>
//     </div>
//   );
// };


export default Counter
