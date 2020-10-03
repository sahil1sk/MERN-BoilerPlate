import * as ActionTypes from './ActionTypes'; 

export const Logged = (state = {isLoading: false, errMess: null, logSuccess:false, logoutSuccess:false}, action) => {
    switch(action.type){        // so according to the action type  we will return state
        case ActionTypes.LOGIN_SUCCESS:    // so here you will see we will returning the state with new objects which we create now we don't modify the state directly
            return {...state, isLoading: false, errMess: null, logSuccess: true}; //...state means we are making the changes

        case ActionTypes.LOGIN_LOADING: // here we set the isLoading to true
            return {...state, isLoading: true, errMess: null, logSuccess:false}; //...state means we are making the changes

        case ActionTypes.LOGIN_FAILED: // when action type is this then we will also get the error message in the payload
            return {...state, isLoading: false, errMess: action.payload, logSuccess:false}; //...state means we are making the changes

        case ActionTypes.LOGOUT_SUCCESS: 
            return {...state,logoutSuccess:true}

        default:                // In defualt we normally returning our state here    
            return state;
    }
}