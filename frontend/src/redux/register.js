import * as ActionTypes from './ActionTypes';

// so here we basically making a reducer and as we know the 
// reducer will take two arguments state and action
export const RegData = (state = {isLoading:false, errMess:null, regSuccess:false }, action) => {
    switch(action.type){        // so according to the action type  we will return state
        case ActionTypes.REGISTRATION_SUCCESS:    // so here you will see we will returning the state with new objects which we create now we don't modify the state directly
        return {...state, isLoading: false, errMess: null, regSuccess:true}; //...state means we are making the changes

        case ActionTypes.REGISTRATION_LOADING: // here we set the isLoading to true
            return {...state, isLoading: true, errMess: null, regSuccess:false}; //...state means we are making the changes

        case ActionTypes.REGISTRATION_FAILED: // when action type is this then we will also get the error message in the payload
            return {...state, isLoading: false, errMess: action.payload, regSuccess:false}; //...state means we are making the changes

        default:                // In defualt we normally returning our state here    
            return state;
    }
}