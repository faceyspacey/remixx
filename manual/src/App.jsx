import React, {createContext, useContext} from 'react'
import {StoreContext} from 'remixx'
import {createStore, combineReducers, bindActionCreators} from 'redux'
import MyRespondComponent from './MyRespondComponent'
const reducer = combineReducers({
    page: (state, action) => action.type || 'HOME',
})

const selectors = {
    sel: state => `${state.page}_selector`,
}

const actions = {
    changePage: type => ({type}),
}

const store = createStore(reducer, selectors, actions)


const StoreContextProvider = props => <StoreContext.Provider value={props.store} />

const App = () => (
  <StoreContextProvider store={store}>
      <MyRespondComponent />
  </StoreContextProvider>
);

export default App;
