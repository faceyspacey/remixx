import { bindActionCreators } from 'redux';
import React, {createContext, useContext} from 'react'

// const useReduxActions = () => {
//   console.log('actionsGoHere');
// };

const StoreContext = createContext()

const useRespond = () => {
  const {getState, dispatch} = useContext(StoreContext)
  const actions = bindActionCreators(getState.actions, dispatch)
  const state = getState()

  return {state, actions}
}

export default {
  StoreContext,
  bindActionCreators,
  useRespond,
};
