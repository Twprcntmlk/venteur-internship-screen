// src/reducers/externals_reducer.js

import { RECEIVE_ZIP, RECEIVE_QUOTE} from '../actions/external_actions';

  const ExternalReducer = (state = {zip:[], quote:[] }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_ZIP:
        newState.zip = action.data;
        return newState;
      case RECEIVE_QUOTE:
        newState.quote = action.data;
        return newState;
      default:
        return state;
    }
  };

  export default ExternalReducer;
