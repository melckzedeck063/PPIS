// actions.js
export const REQUEST_SENT = 'REQUEST_SENT';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const requestSent = () => ({ type: REQUEST_SENT });
export const requestSuccess = (message) => ({ type: REQUEST_SUCCESS, payload: { message } });
export const requestFailure = (error) => ({ type: REQUEST_FAILURE, payload: { error } });
export const clearMessages = () => ({ type: CLEAR_MESSAGES });
