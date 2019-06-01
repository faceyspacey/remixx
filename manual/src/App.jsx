import React, { createContext, useContext } from 'react';
import Remixx from 'remixx';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import MyRespondComponent from './MyRespondComponent';

const reducer = combineReducers({
  page: (state, action) => action.type || 'HOME',
});
const StoreContext = Remixx.StoreContext;
const selectors = {
  sel: state => `${state.page}_selector`,
};

const actions = {
  changePage: type => ({ type }),
};

const store = createStore(reducer, selectors, actions);
const StoreContextProvider = props => <StoreContext.Provider value={props.store} children={props.children}/>;


const App = () => (
  <div>
    <StoreContextProvider store={store}>
      <MyRespondComponent/>
    </StoreContextProvider>
  </div>
);

export default App;
