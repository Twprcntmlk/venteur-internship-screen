import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import external from './external_reducer';

const RootReducer = combineReducers({
  errors,
  session,
  external,
});

export default RootReducer;
