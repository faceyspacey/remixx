import React from 'react';
import Remixx from 'remixx';
import Switcher from './components/Switcher'
import Sidebar from './components/Sidebar'
import configureStore from './configureStore';
import styles from './css/App.css'
const { store, firstRoute } = configureStore()

const StoreContext = Remixx.StoreContext;

const StoreContextProvider = props => <StoreContext.Provider value={props.store} children={props.children}/>;

const App = () => (
  <div className={styles.app}>
    <StoreContextProvider store={store}>
      <Sidebar/>
      <Switcher/>
    </StoreContextProvider>
  </div>
);

store.dispatch(firstRoute())


export default App;
