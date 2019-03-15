

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useReduxStateSimple = exports.useReduxState = exports.useReduxDispatch = exports.ReduxProvider = void 0;

const _react = require('react');

const _proxyequal = require('proxyequal');

// https://github.com/faceyspacey/remixx/issues/1#issuecomment-449665675
(0, _proxyequal.spreadGuardsEnabled)(false); // global context

const warningObject = {
  get dispatch() {
    throw new Error('Please use <ReduxProvider store={store}>');
  },

  get getState() {
    throw new Error('Please use <ReduxProvider store={store}>');
  },

};
const ReduxStoreContext = (0, _react.createContext)(warningObject); // helper hooks

const forcedReducer = function forcedReducer(state) {
  return !state;
};

const useForceUpdate = function useForceUpdate() {
  return (0, _react.useReducer)(forcedReducer, false)[1];
}; // exports


const ReduxProvider = function ReduxProvider(_ref) {
  const { store } = _ref;
  const { children } = _ref;
  return (0, _react.createElement)(ReduxStoreContext.Provider, {
    value: store,
  }, children);
};

exports.ReduxProvider = ReduxProvider;

const useReduxDispatch = function useReduxDispatch() {
  const store = (0, _react.useContext)(ReduxStoreContext);
  return store.dispatch;
};

exports.useReduxDispatch = useReduxDispatch;

const useReduxState = function useReduxState() {
  const forceUpdate = useForceUpdate();
  const store = (0, _react.useContext)(ReduxStoreContext); // state

  const state = store.getState();
  const lastState = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    lastState.current = state;
  }); // trapped

  const proxyMap = (0, _react.useRef)(new WeakMap());
  const trappedMap = (0, _react.useRef)(new WeakMap());
  const lastTrapped = (0, _react.useRef)(null);
  let trapped;
  (0, _react.useEffect)(() => {
    lastTrapped.current = trapped;
  });

  if (trappedMap.current.has(state)) {
    trapped = trappedMap.current.get(state);
  } else {
    trapped = (0, _proxyequal.proxyState)(state, null, proxyMap.current);
    trappedMap.current.set(state, trapped);
  } // subscription


  const callback = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    callback.current = function () {
      const changed = !(0, _proxyequal.proxyEqual)(lastState.current, store.getState(), lastTrapped.current.affected);
      (0, _proxyequal.drainDifference)();

      if (changed) {
        forceUpdate();
      }
    };

    const unsubscribe = store.subscribe(callback.current);

    const cleanup = function cleanup() {
      unsubscribe();
      callback.current = null;
    };

    return cleanup;
  }, [store]); // run callback in each commit phase in case something has changed.

  (0, _react.useEffect)(() => {
    if (callback.current) {
      callback.current();
    }
  });
  return trapped.state;
};

exports.useReduxState = useReduxState;

const useReduxStateSimple = function useReduxStateSimple() {
  const forceUpdate = useForceUpdate();
  const store = (0, _react.useContext)(ReduxStoreContext);
  const used = (0, _react.useRef)({});
  const handler = (0, _react.useMemo)(() => ({
    get: function get(target, name) {
      used.current[name] = true;
      return target[name];
    },
  }), []);
  const state = store.getState();
  const lastState = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    lastState.current = state;
  });
  const callback = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    callback.current = function () {
      const nextState = store.getState();
      const changed = Object.keys(used.current).find(key => lastState.current[key] !== nextState[key]);

      if (changed) {
        forceUpdate();
      }
    };

    const unsubscribe = store.subscribe(callback.current);

    const cleanup = function cleanup() {
      unsubscribe();
      callback.current = null;
      used.current = {};
    };

    return cleanup;
  }, [store]); // run callback in each commit phase in case something has changed.

  (0, _react.useEffect)(() => {
    if (callback.current) {
      callback.current();
    }
  });
  return new Proxy(state, handler);
};

exports.useReduxStateSimple = useReduxStateSimple;
