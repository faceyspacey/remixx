import React from 'react';

const MyRespondComponent = (props, state, actions) => (
  <div>
    <button onClick={() => actions.changePage('LOGIN')}>{state.page}</button>
  </div>
);

export default MyRespondComponent;