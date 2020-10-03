import {baseUrl} from '../shared/baseUrl'; // so here we import the base url
import { checkToken } from './checkToken';
import {loginLoaing, loginFailed, 
    loginSuccess, registerFailed, 
    registerLoaing, registerSuccess,
    userDataFail, userDataSuccess
   } from './dispatchers';

export const tryLogin = (username, password) => (dispatch) => {
    let endPoint = baseUrl + '/users/login';
    dispatch(loginLoaing(true));

    let credentials = {
        "username": username, 
        "password": password
    } 

    return fetch( endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else { 
                var error = new Error('Error: '+ response.status + ': ' + response.statusText); 
                error.response = response;  
                throw error; 
            }
        },               
        error => {
            var errmess = new Error(error.message); 
            throw errmess;
        })
        .then( data => data.json())
        .then(data => {
                localStorage.setItem(baseUrl + 'username', username);
                localStorage.setItem(baseUrl + 'token', data.key);
                dispatch(loginSuccess());                        // dispatching the login sucess so that it will come to home page
                dispatch(userDataSuccess(username, data.key));    // providing the data key
            }
        )
        .catch(error => dispatch(loginFailed("Login error is: " + error.message))); // so if there is any error then we will dispatch the error function 
        
}

export const tryRegister = (username, email, password) => (dispatch) => {

    dispatch(registerLoaing(true));

    const credentials = {
        "username": username,
        "email": email,
        "password": password
    }
    
    return fetch( baseUrl + '/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else { 
                var error = new Error('Error: '+ response.status + ': ' + response.statusText); // then the error is catched not used as .then
                error.response = response; // so using the object which we create then we take the response and create the error text 
                throw error; //and then we through the error basically throw will handle by catch
            }

        },               // so we make here another error if there is any error while communication before we got any response then we handle that in given way
        error => {
            var errmess = new Error(error.message); 
            throw errmess;
        })
        .then(data => data.json())
        .then(data => {
                dispatch(registerSuccess())
                dispatch(tryLogin(username, password)) 
            }
        )
        .catch(error => dispatch(registerFailed("Register Error is: " + error.message))); // so if there is any error then we will dispatch the error function
    
}


// so this function we used to do logout
export const logout = () => {
    localStorage.removeItem(baseUrl + 'token'); // so here we romoving the user from the local storage
    localStorage.removeItem(baseUrl + 'username') 
    return dispatch => {
        dispatch(userDataFail());
    }
}

// this method is called before mounting the component
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem(baseUrl+'token');
        if (token === undefined || token === null){
            dispatch(logout());
        }else{
            if (token) { 
                dispatch(checkToken());
            }
        }
    }
}