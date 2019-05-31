import React, { createContext, useState } from 'react';

const MyRespondComponent = (props, state, actions) => {
  console.log(props,state,actions)
  return (
    <div>
      <button onClick={() => actions.changePage('LOGIN')}>{state.page || 'button'}</button>
    </div>
  );
}

export default MyRespondComponent;