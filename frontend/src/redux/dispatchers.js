// This file will contain all the dispatcher
import * as ActionTypes from './ActionTypes'; 

// this function is called when we succesfully got the token and username
export const userDataSuccess = (username, token) => ({
    type: ActionTypes.HAVING_DATA,
    payload: {username, token}
});

// this will help to send that there is no data it is called by logout only
export const userDataFail = () => ({
    type: ActionTypes.NO_DATA
});

// these dispatchers related to logout
export const loginLoaing = () => ({
    type: ActionTypes.LOGIN_LOADING
});


export const loginSuccess = () => ({
    type: ActionTypes.LOGIN_SUCCESS
});

export const loginFailed = (error) => ({
    type : ActionTypes.LOGIN_FAILED,
    payload: error
});

export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

// these dispatchers related to registeration
export const registerLoaing = () => ({
    type: ActionTypes.REGISTRATION_LOADING
});

export const registerSuccess = () => ({
    type: ActionTypes.REGISTRATION_SUCCESS
});


export const registerFailed = (error) => ({
    type : ActionTypes.REGISTRATION_FAILED,
    payload: error
});
