// this file help to send that user having data or not
import * as ActionTypes from './ActionTypes'; 

export const user_data = (state = {username: null, token: null}, action) => {
    switch(action.type){        // so according to the action type  we will return state
        case ActionTypes.HAVING_DATA: // here we set the isLoading to true
            return {...state, username: action.payload.username, token: action.payload.token}; //...state means we are making the changes

        case ActionTypes.NO_DATA:
            return {...state, username:null, token:null}

        default:                // In defualt we normally returning our state here    
            return state;
    }
}