// reducers.js
// import { REQUEST_SENT, REQUEST_SUCCESS, REQUEST_FAILURE, CLEAR_MESSAGES } 
import { REQUEST_SENT,REQUEST_SUCCESS, REQUEST_FAILURE, CLEAR_MESSAGES } from "../actions/notifications_actions";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SENT:
      return { ...state, loading: true, successMessage: null, errorMessage: null };
    case REQUEST_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload.message, errorMessage: null };
    case REQUEST_FAILURE:
      return { ...state, loading: false, successMessage: null, errorMessage: action.payload.error };
    case CLEAR_MESSAGES:
      return { ...state, successMessage: null, errorMessage: null };
    default:
      return state;
  }
};

export default notificationReducer;
