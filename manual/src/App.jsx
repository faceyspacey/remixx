import React, { createContext, useContext } from 'react';
import Remixx from 'remixx';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import MyRespondComponent from './MyRespondComponent';
import configureStore from './configureStore';
const { store, firstRoute } = configureStore()
const reducer = combineReducers({
  page: (state, action) => action.type || 'HOME',
});
const StoreContext = Remixx.StoreContext;


const StoreContextProvider = props => <StoreContext.Provider value={props.store} children={props.children}/>;


const App = () => (
  <div>
    <StoreContextProvider store={store}>
      <MyRespondComponent/>
    </StoreContextProvider>
  </div>
);

export default App;
