import {
  useReduxDispatch,
  useReduxState,
  useReduxStateSimple,
} from 'reactive-react-redux';
import { bindActionCreators } from 'redux';

const useReduxActions = () => {
  console.log('actionsGoHere');
};

const useRespond = module => ({
  state: useReduxState,
  actions: useReduxActions,
});

export default {
  useReduxDispatch,
  useReduxState,
  useReduxStateSimple,
  useReduxActions,
  bindActionCreators,
  useRespond,
};
