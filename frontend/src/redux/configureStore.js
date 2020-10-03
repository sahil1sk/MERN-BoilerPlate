import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { user_data } from './userData';
import {Logged} from './login';
import thunk from 'redux-thunk';    
import {RegData} from './register'; 

export const ConfigureStore = () => {

    const store = createStore(  
        combineReducers({
            loginResponse: Logged,
            userData: user_data,
            regResponse: RegData,
        }),   
        applyMiddleware(thunk)      
    );

    return store;
}

