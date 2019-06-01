/* eslint-env browser */
import 'core-js';
import {
  push,
  replace,
  jump,
  back,
  next,
  reset,
  set,
  setParams,
  setQuery,
  setState,
  setHash,
  setBasename,
  createRouter,
} from '@respond-framework/rudy/dist';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import routes from './routes';
import * as reducers from './reducers';
import * as actions from './actions';

export default (preloadedState, initialEntries) => {
  const options = {
    initialEntries,
    basenames: ['/foo', '/bar']
  };
  const { reducer, middleware, firstRoute, history, ctx } = createRouter(
    routes,
    options,
  );

  //reducers are combined under the hood
  const rootReducer = {
    ...reducers,
    location: reducer
  };
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(middlewares);
  const selectors = {
    currentPost: (state) => {
      return state.page;
    },
    multiArityCheck: (state, filter) => `${state.page}_${filter}`
  };

  const store = createStore(rootReducer, selectors, actions, preloadedState, enhancers);


  if (typeof window !== 'undefined') {
    window.routes = routes;
    window.store = store;
    window.hist = history;
    window.actions = actionCreators;
    window.ctx = ctx;
  }


  return {
    store,
    firstRoute
  };
}

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? compose(...args)
    : compose(...args);

const actionCreators = {
  push,
  replace,
  jump,
  back,
  next,
  reset,
  set,
  setParams,
  setQuery,
  setState,
  setHash,
  setBasename,
};
